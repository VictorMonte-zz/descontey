import { Logger } from '@nestjs/common';
import { Product } from "../interface/product";
import { Discount } from '../discount';
import BlackfridayDiscount from '../blackfridayDiscount';
import { BlackFridayService } from '../../application/service/blackFriday.service';
import { WithoutDiscount } from '../withoutDiscount';
import { DiscountRule } from './discountRule';

export class BlackFridayDiscountRule implements DiscountRule {
  
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
