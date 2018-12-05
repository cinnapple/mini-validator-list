# this script runs inside of the container...

echo "starting the app..."
echo "the environment is set to: $NODE_ENV"

if [ "$NODE_ENV" == 'production' ]; then
  yarn run start
else
  # dev enviornment
  yarn run debug
fi
