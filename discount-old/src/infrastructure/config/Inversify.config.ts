import {Container} from "inversify";
import DataBaseConfiguration from "./DatabaseConfiguration";
import App from "../../app";
import { TYPES } from "./Types";
import DiscountService from "../../application/service/DiscountService";
import { DiscountServiceGrpc } from "../../presentation/grpc/DiscountServiceGrpc";

let container = new Container();

container.bind<App>(TYPES.App).to(App).inSingletonScope();
container.bind<DataBaseConfiguration>(TYPES.Database).toConstantValue(new DataBaseConfiguration());
container.bind<DiscountService>(TYPES.DiscountService).to(DiscountService).inTransientScope();
container.bind<DiscountServiceGrpc>(TYPES.DiscountServiceGrpc).to(DiscountServiceGrpc).inTransientScope();

export default container;
