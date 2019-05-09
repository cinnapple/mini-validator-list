DIR=.
OUT_DIR=dist

rm -f $OUT_DIR
mkdir $OUT_DIR

protoc -I=$DIR $1 \
  --js_out=import_style=commonjs:$OUT_DIR \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:$OUT_DIR
