import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';
import { DiscountModule } from './infrastructure/module/discount.module';
import { SeederService } from './application/service/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DiscountModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051', 
      package: 'discount',
      protoPath: join(__dirname, 'discount/discount.proto'),
    },
  }).then(async appContext => {

    const seeder = appContext.get(SeederService);
    seeder.seed();

    await appContext.listenAsync();

  });

  //await app.listenAsync();

}
bootstrap();
