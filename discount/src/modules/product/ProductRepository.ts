import * as mongoose from 'mongoose';

import ProductSchema from './ProductSchema';

export default mongoose.model('Product', ProductSchema);