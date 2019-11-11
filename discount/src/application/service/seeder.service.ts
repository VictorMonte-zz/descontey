import { Inject, Injectable } from "@nestjs/common";

import { Model } from "mongoose";

import { User } from "src/domain/interface/user";

@Injectable()
export class SeederService {

    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {

    }

    seed() {

        console.log("Seeding...");

        this.userModel.findOneAndDelete({ id: '1' }).exec();
        this.userModel.create({ id: '1', firstName: 'John', lastName: 'Wick', dateOfBirth: new Date() });
        
        this.userModel.findOneAndDelete({ id: '2' }).exec();
        this.userModel.create({ id: '2', firstName: 'Bruce', lastName: 'Wayne', dateOfBirth: new Date('1980-11-16T00:00:00') });

        console.log("Finish seeding");
    }
}