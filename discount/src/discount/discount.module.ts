import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { userProviders, productProvider } from 'src/provider/user.providers';
import { from } from 'rxjs';
import { GetDiscountService } from 'src/service/discounts.service';
import { DatabaseModule } from 'src/module/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DiscountController],
  providers: [
    GetDiscountService,
    ...userProviders,
    ...productProvider
    ],
})
export class DiscountModule {}