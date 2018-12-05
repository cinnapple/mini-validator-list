# build backend
echo "building api..."
cd api

if [[ ! -f .env ]] ; then
    echo 'File ".env" does not exist. Please create the file by copying ".env.example" to ".env"'
    exit
fi

yarn install
yarn run build
cd ..
echo

# build frontend
echo "building frontend..."
cd frontend
yarn install
yarn run build
cd ..
echo
