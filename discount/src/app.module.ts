import { Module } from '@nestjs/common';
import { DatabaseModule } from './module/database.module';
import { DiscountService } from './service/discounts.service';
import { userProviders, productProvider } from './provider/user.providers';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [DatabaseModule, DiscountModule],
  providers: [
    DiscountService,
    ...userProviders,
    ...productProvider
    ],
})
export class AppModule {}
