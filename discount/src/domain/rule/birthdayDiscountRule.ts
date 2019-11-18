import { User } from '../interface/user';
import { Product } from "../interface/product";
import { Discount } from '../discount';
import BirthdayDiscount from '../birthdayDiscount';
import { WithoutDiscount } from '../withoutDiscount';
import { DiscountRule } from './discountRule';

export class BirthdayDiscountRule implements DiscountRule {

  constructor(private readonly user: User, private readonly product: Product) {
  }
  
  calculate(): Discount {

    if (this.isBirthday(this.user)) {
      const price = this.product.get('priceInCents');
      return new BirthdayDiscount(price);
    }

    return new WithoutDiscount();
  }
  private isBirthday(user: User): Boolean {
    const today = new Date();
    const birthday = new Date(user.get('dateOfBirth'));

    return today.getDay() === birthday.getDay()
      && today.getMonth() === birthday.getMonth();
  }
}
