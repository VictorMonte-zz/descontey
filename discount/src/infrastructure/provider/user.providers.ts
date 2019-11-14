import { Connection } from 'mongoose';
import { UserSchema } from '../../infrastructure/schema/user.schema';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const productProvider = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) => connection.model('Product', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];