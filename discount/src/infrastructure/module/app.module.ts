import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountModule } from './discount.module';


@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/descontey'), DiscountModule]
})
export class AppModule {}