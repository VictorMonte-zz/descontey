import { Discount } from '../../domain/discount';

export interface DiscountRule {
  calculate(): Discount;
}
