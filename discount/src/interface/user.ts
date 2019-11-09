import { Document } from 'mongoose';
import { read } from 'fs';

export interface User extends Document {
    readonly id: string;
    readonly firstName: number;
    readonly lastName: string;
    readonly dateOfBirth: Date;
}

export interface Product extends Document {
    readonly id: string,
    readonly priceInCents: number,
    readonly title: string,
    readonly description: string,
    readonly discount: Discount
}

export interface Discount extends Document {
    readonly porcent: number,
    readonly valueInCents: number
}