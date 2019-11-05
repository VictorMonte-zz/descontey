import { Typegoose, prop } from 'typegoose';
import { Discount } from './discount';

export class Product extends Typegoose {

    @prop()
    id:String;

    @prop()
    priceInCents:number;

    @prop()
    title:String;

    @prop()
    description:String;

    @prop()
    discount:Discount;

}

export default new Product().getModelForClass(Product);