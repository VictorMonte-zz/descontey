import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User, Product } from 'src/interface/user';
import { GetDiscountDto } from 'src/dto/get-discount';

@Injectable()
export class DiscountService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<Product>
  ) {}

  async get(getDiscountDto: GetDiscountDto) {

    let user = await this.userModel.find({id: getDiscountDto.getUserId()}).exec();
    console.log(user);

    let product = await this.productModel.find({ id: getDiscountDto.getProductId()}).exec();
    console.log(product);

  }
}