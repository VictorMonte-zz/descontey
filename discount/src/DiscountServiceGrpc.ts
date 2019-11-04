import { from } from 'rxjs';
import { discount } from './grpc-namespaces';
import DiscountService from './domain/discount/discountService';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';

@injectable()
export class DiscountServiceGrpc implements discount.DiscountService {
  private discountService: DiscountService;

  constructor(
    @inject(TYPES.DiscountService)
    discountService: DiscountService) {
    this.discountService = discountService;
  }
  
  get(request: discount.GetDiscountRequest, metadata?: import("grpc").Metadata): import("rxjs").Observable<discount.GetDiscountReply> {
    return from(this.discountService.get(request.userId, request.productId));
  }
}
