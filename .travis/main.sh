setup_env(){
  yarn global add typescript
}

encrypt(){
  travis encrypt DOCKER_PASSWORD=$1 -r cinnapple/mini-validator-list
}

"$@"
