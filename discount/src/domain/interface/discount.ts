import { Document } from 'mongoose';

export interface Discount extends Document {
    readonly porcent: number;
    readonly valueInCents: number;
}
