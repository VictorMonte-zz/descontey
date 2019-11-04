import DataBase from './config/db';
import { serverBuilder } from 'rxjs-grpc';
import { discount } from './grpc-namespaces';
import DiscountService from './domain/discount/DiscountService';
import UserModel from './model/User';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import { DiscountServiceGrpc } from './DiscountServiceGrpc';

type ServerBuilder = discount.ServerBuilder;

@injectable()
class App {
  private database: DataBase;
  private discountServiceGrpc: DiscountServiceGrpc;

  constructor(@inject(TYPES.Database) database: DataBase, @inject(TYPES.DiscountServiceGrpc) discountService: DiscountServiceGrpc) {
    this.database = database;
    this.discountServiceGrpc = discountService;
  }

  boostrap() {
    this.dataBaseConnection();
    this.seedDatabase();
    this.initializeGRPCServer();
  }
  
  private initializeGRPCServer() {
    
    const server = serverBuilder<ServerBuilder>('src/discount.proto', 'discount');

    // bind services
    server.addDiscountService(this.discountServiceGrpc);

    // run
    server.start('0.0.0.0:50051');

    console.log('Discount microservice running on 0.0.0.0:50051');
  }

  dataBaseConnection() {
    this.database.createConnection();
  }

  closeDataBaseConnection(message, callback) {
    this.database.closeConnection(message, () => callback());
  }

  async seedDatabase() {

    console.log("Starting seeding database...");

    await UserModel.findOneAndRemove({id: 1})
    await UserModel.create({id: 1, firstName: 'Victor', lastName: 'Monte', dateOfBirth: Date()});

    console.log("Seed database finised");
  }
}

export default App;