import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { SeederService } from "src/application/service/seeder.service";
import { userProviders } from "../provider/user.providers";

@Module({
    imports: [DatabaseModule],
    providers: [SeederService, ...userProviders]
})
export class SeederModule { }