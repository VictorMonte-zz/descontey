import { Module } from "@nestjs/common";
import { SeederService } from "../../application/service/seeder.service";
import { userProviders } from "../provider/user.providers";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "../schema/user.schema";


@Module({
    imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) ],
    providers: [ SeederService ]
})
export class SeederModule { }