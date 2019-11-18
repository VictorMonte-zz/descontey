import { Discount } from '../discount';

export interface DiscountRule {
  calculate(): Discount;
}
