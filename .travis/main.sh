REACT_DOT_ENV="web/.env"
PAYMENT_POINTER="twitter.xrptipbot.com/CinnappleFun"

setup_env(){
  echo "Installing TypeScript"
  yarn global add typescript

  # payment pointer for web-monetization
  echo "Creating a dot-env file for React app"
  cat <<EOM >$REACT_DOT_ENV
REACT_APP_PAYMENT_POINTER=$PAYMENT_POINTER
EOM
}

encrypt(){
  travis login --pro
  travis encrypt --com $1=$2
}

"$@"
