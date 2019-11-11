import { Module } from '@nestjs/common';
import { DiscountController } from '../../presentation/controller/discount.controller';
import { userProviders, productProvider } from 'src/infrastructure/provider/user.providers';
import { from } from 'rxjs';
import { GetDiscountService } from 'src/application/service/discounts.service';
import { DatabaseModule } from 'src/infrastructure/module/database.module';
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