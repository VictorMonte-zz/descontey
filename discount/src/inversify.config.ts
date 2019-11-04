import {Container} from "inversify";
import {TYPES} from "./types";
import DiscountService from "./domain/discount/DiscountService";
import DataBase from "./config/db";
import App from "./app";
import { DiscountServiceGrpc } from "./DiscountServiceGrpc";

let container = new Container();

container.bind<App>(TYPES.App).to(App).inSingletonScope();
container.bind<DataBase>(TYPES.Database).toConstantValue(new DataBase());
container.bind<DiscountService>(TYPES.DiscountService).to(DiscountService).inTransientScope();
container.bind<DiscountServiceGrpc>(TYPES.DiscountServiceGrpc).to(DiscountServiceGrpc).inTransientScope();

export default container;
