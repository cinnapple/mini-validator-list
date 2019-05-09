import * as path from "path";
import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import * as debug from "debug";
const _d = debug("streaming:grpcServiceLoader");
const pathToProtoSrc = path.join(
  __dirname,
  "../",
  "node_modules",
  "minivalist-shared",
  "proto-src"
);

const loadService = (protoPath: string) => {
  const packageDefinition = protoLoader.loadSync(`${__dirname}/${protoPath}`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
  return protoDescriptor as any;
};

const loadEchoService = () => {
  const service = loadService(`echo.proto`);
  return service.grpc.gateway.testing as {
    EchoService: {
      service: any;
    };
  };
};

export { loadEchoService };
