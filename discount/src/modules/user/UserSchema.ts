import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: {type: String, unique:true ,required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: Date, required: true}
});

export default UserSchema;
