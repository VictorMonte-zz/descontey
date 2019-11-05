import { Typegoose, prop } from 'typegoose';

export class Discount extends Typegoose {

    @prop()
    porcent: number;

    @prop()
    valueInCents: number;
    
}
