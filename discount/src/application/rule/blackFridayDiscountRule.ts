import { Logger } from '@nestjs/common';
import { Product } from "../../domain/interface/product";
import { Discount } from '../../domain/discount';
import BlackfridayDiscount from '../../domain/blackfridayDiscount';
import { BlackFridayService } from '../service/blackFriday.service';
import { WithoutDiscount } from '../../domain/withoutDiscount';
import { DiscountRule } from './discountRule';

export class BlackFridayDiscountRule implements DiscountRule {

  private readonly logger = new Logger(BlackFridayDiscountRule.name);

  constructor(private readonly blackFridayService: BlackFridayService, private readonly product: Product) {
  }

  calculate(): Discount {

    if (this.blackFridayService.isToday()) {
      const price = this.product.get('priceInCents');
      return new BlackfridayDiscount(price);
    }
    
    return new WithoutDiscount();
  }
}
