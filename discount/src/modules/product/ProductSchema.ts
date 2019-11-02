import * as mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    id: {type: String, unique:true ,required: true},
    priceInCents: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    discount: {
        porcent: {type: Number},
        valueInCents: {type: Number}
    }
}, { id: false });

export default ProductSchema;
