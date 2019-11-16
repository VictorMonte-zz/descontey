import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/interface/user';
import { Product } from "../../domain/interface/product";
import { GetDiscountQuery } from '../../application/query/getDiscountQuery';
import { Discount } from '../../domain/discount';
import GetDiscountResponse from '../response/getDiscountResponse';
import BirthdayDiscount from '../../domain/birthdayDiscount';
import BlackfridayDiscount from '../../domain/blackfridayDiscount';
import { InjectModel } from '@nestjs/mongoose';
import { BlackFridayService } from './blackFriday.service';

@Injectable()
export class GetDiscountService {
  
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, 
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly blackFridayService: BlackFridayService) {
  }

  async get(query: GetDiscountQuery): Promise<GetDiscountResponse> {

    var discount = new Discount(0);

    //TODO: should handle when not user found
    const user = await this.userModel.findOne({ id: query.getUserId()}).exec();

    if(this.isBirthday(user)) {
      console.log('User ' + user.get('id') + ' with birthday discount');
      //TODO: should handle product not found
      const product = await this.productModel.findOne({ id: query.getProductId()}).exec();
      discount = new BirthdayDiscount(product.get('priceInCents'));
    }

    if(this.blackFridayService.isToday()) {
      console.log('User ' + user.get('id') + ' with blackfriday discount');
      const product = await this.productModel.findOne({id: query.getProductId()}).exec();
      discount = new BlackfridayDiscount(product.get('priceInCents'));
    }

    return new GetDiscountResponse(discount);
  }

  private isBirthday(user: User): Boolean {
    const today = new Date();
    const birthday = new Date(user.get('dateOfBirth'));
    
    return today.getDay() === birthday.getDay() 
        && today.getMonth() === birthday.getMonth();
  }
}