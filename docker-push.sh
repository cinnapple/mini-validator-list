# build docker images
echo "building images..."
docker-compose build
echo

# build docker images
echo "tagging imgaegs with 'cinnapple'..."
docker image tag minivalist-etl cinnapple/minivalist-etl
docker image tag minivalist-api cinnapple/minivalist-api
docker image tag minivalist-web cinnapple/minivalist-web
echo

# push docker image
echo "pushing images to the hub..."
docker image push cinnapple/minivalist-etl
docker image push cinnapple/minivalist-api
docker image push cinnapple/minivalist-web
echo

echo "done."
