setup_env(){
  yarn global add typescript
}

encrypt(){
  travis login --pro
  travis encrypt --com $1=$2
}

"$@"
