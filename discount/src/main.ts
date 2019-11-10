import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';
import { DiscountModule } from './infrastructure/module/discount.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DiscountModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051', 
      package: 'discount',
      protoPath: join(__dirname, 'discount/discount.proto'),
    },
  });
  await app.listenAsync();
}
bootstrap();
