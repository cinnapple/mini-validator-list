# build etl
echo "building etl..."
cd etl
yarn run build
cd ..
echo

# build web
echo "building web..."
cd web
yarn run build
cd ..
echo

echo "done."
