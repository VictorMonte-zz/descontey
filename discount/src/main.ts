import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5500', 
      package: 'discount',
      protoPath: join(__dirname, 'discount/discount.proto'),
    },
  });
  await app.listenAsync();
}
bootstrap();
