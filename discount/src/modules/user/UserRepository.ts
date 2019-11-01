import * as mongoose from 'mongoose';

import UserSchema from './UserSchema';

export default mongoose.model('User', UserSchema);