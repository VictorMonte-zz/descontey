import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';
import { DiscountModule } from './discount/discount.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DiscountModule, {
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
