import { Document } from 'mongoose';
import { Discount } from "./discount";

export interface Product extends Document {
    readonly id: string;
    readonly priceInCents: number;
    readonly title: string;
    readonly description: string;
    readonly discount: Discount;
}
