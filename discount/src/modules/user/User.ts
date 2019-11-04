import { prop, Typegoose } from 'typegoose';

export class User extends Typegoose {

    @prop()
    id: string;

    @prop()
    firstName: string;

    @prop()
    lastName: string;

    @prop()
    dateOfBirth: Date;
}

export default new User().getModelForClass(User);