import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountModule } from './discount.module';
import { ConfigModule } from './config.module';
import { ConfigService } from '../config/config.service';


@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              uri: configService.get('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
        //MongooseModule.forRoot('mongodb://localhost/descontey'), 
        DiscountModule
    ]
})
export class AppModule {}