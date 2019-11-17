import { Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "../../domain/interface/user";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SeederService {

    private readonly logger = new Logger(SeederService.name);

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async seed() {

        this.logger.log("Seeding starting..");

        await this.userModel.findOneAndDelete({ id: '1' }).exec();
        await this.userModel.create({ id: '1', firstName: 'John', lastName: 'Wick', dateOfBirth: new Date() });
        
        await this.userModel.findOneAndDelete({ id: '2' }).exec();
        await this.userModel.create({ id: '2', firstName: 'Bruce', lastName: 'Wayne', dateOfBirth: new Date('1980-11-16T00:00:00') });

        this.logger.log("Seeding finished");
    }
}