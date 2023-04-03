import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const authGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50001',

    package: 'auth',
    protoPath: join(__dirname, './auth.proto'),
  },
};
