import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';
import { SeederService } from './application/service/seeder.service';
import { AppModule } from './infrastructure/module/app.module';

async function bootstrap() {
  
  await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051', 
      package: 'discount',
      protoPath: join(__dirname, 'proto/discount.proto'),
    },
  })
  .then(async appContext => {

    const seeder = appContext.get(SeederService);
    seeder.seed();

    await appContext.listenAsync();
  });

}
bootstrap();
