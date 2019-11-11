import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date
});

export const ProductSchema = new mongoose.Schema({
  id: String,
  priceInCents: Number,
  title: String,
  description: String,
  discount: {
    porcent: Number,
    valueInCents: Number
  }
});
