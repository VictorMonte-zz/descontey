import { from } from 'rxjs';
import { discount } from './grpc-namespaces';
import { injectable, inject } from 'inversify';
import DiscountService from '../../application/service/DiscountService';
import { TYPES } from '../../infrastructure/config/Types';
import GetDiscountCommand from '../../application/command/GetDiscountCommand';

@injectable()
export class DiscountServiceGrpc implements discount.DiscountService {
  private discountService: DiscountService;

  constructor(
    @inject(TYPES.DiscountService)
    discountService: DiscountService) {
    this.discountService = discountService;
  }
  
  get(request: discount.GetDiscountRequest, metadata?: import("grpc").Metadata): import("rxjs").Observable<discount.GetDiscountReply> {
    let command = new GetDiscountCommand(request.userId, request.productId)
    return from(this.discountService.get(command));
  }
}
