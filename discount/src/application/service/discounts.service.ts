import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../domain/interface/user';
import { Product } from "../../domain/interface/product";
import { GetDiscountQuery } from '../../application/query/getDiscountQuery';
import GetDiscountResponse from '../response/getDiscountResponse';
import { InjectModel } from '@nestjs/mongoose';
import { BlackFridayService } from './blackFriday.service';
import { WithoutDiscount } from '../../domain/withoutDiscount';
import { DiscountRule } from '../../domain/rule/discountRule';
import { BirthdayDiscountRule } from '../../domain/rule/birthdayDiscountRule';
import { BlackFridayDiscountRule } from '../../domain/rule/blackFridayDiscountRule';

@Injectable()
export class GetDiscountService {
  
  private readonly logger = new Logger(GetDiscountService.name);

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, 
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly blackFridayService: BlackFridayService) {
  }

  async get(query: GetDiscountQuery): Promise<GetDiscountResponse> {

    const user = await this.userModel.findOne({ id: query.getUserId()}).exec();
    const product = await this.productModel.findOne({ id: query.getProductId()}).exec();

    const rules: Array<DiscountRule> = new Array;
    rules.push(new BirthdayDiscountRule(user, product));
    rules.push(new BlackFridayDiscountRule(this.blackFridayService, product));

    var discount = new WithoutDiscount();
    rules.forEach(rule => {
      const result = rule.calculate();
      if(result.getPorcent() > discount.getPorcent()) {
        discount = result;
      }
    });

    this.logger.log("User " + user.id + " with discount " + discount.getPorcent())

    return new GetDiscountResponse(discount);
  }
  
}