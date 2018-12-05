# build backend
echo "building api..."
cd api
yarn run build
cd ..
echo

# build frontend
echo "building frontend..."
cd frontend
yarn run build
cd ..
echo

# build docker images
echo "building images..."
docker-compose build
echo

# build docker images
echo "tagging imgaegs with 'cinnapple'..."
docker image tag mini-validator-list-backend cinnapple/mini-validator-list-backend
docker image tag mini-validator-list-frontend cinnapple/mini-validator-list-frontend
echo

# push docker image
echo "pushing images to the hub..."
docker image push cinnapple/mini-validator-list-backend
docker image push cinnapple/mini-validator-list-frontend
echo

echo "done."
