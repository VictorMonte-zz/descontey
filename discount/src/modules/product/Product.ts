import { Typegoose, prop } from 'typegoose';

export class Discount extends Typegoose {

    @prop()
    porcent: number;

    @prop()
    valueInCents: number;
}

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