import { Module } from '@nestjs/common';
import { DiscountController } from '../../presentation/controller/discount.controller';
import { userProviders, productProvider } from '../../infrastructure/provider/user.providers';
import { GetDiscountService } from '../../application/service/discounts.service';
import { DatabaseModule } from '../../infrastructure/module/database.module';
import { SeederModule } from './seeder.module';

@Module({
  imports: [DatabaseModule, SeederModule],
  controllers: [DiscountController],
  providers: [
    GetDiscountService,
    ...userProviders,
    ...productProvider
    ],
})
export class DiscountModule {}