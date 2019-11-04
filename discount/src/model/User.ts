import { prop, Typegoose, instanceMethod } from 'typegoose';

export class User extends Typegoose {

    @prop()
    id: string;

    @prop()
    firstName: string;

    @prop()
    lastName: string;

    @prop()
    dateOfBirth: Date;

    @instanceMethod
    isBirthday() {
        const today = new Date();
        return today.getDay() === this.dateOfBirth.getDay() 
            && today.getMonth() === this.dateOfBirth.getMonth();
    }
}

export default new User().getModelForClass(User);