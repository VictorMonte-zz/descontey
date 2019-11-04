import DataBase from './config/db';
import { from } from 'rxjs';
import { serverBuilder } from 'rxjs-grpc';
import { discount } from './grpc-namespaces';
import DiscountService from './service/DiscountService';
import UserModel from './model/User';

type ServerBuilder = discount.ServerBuilder;

class App {
  
  private database: DataBase;

  constructor() {
    this.database = new DataBase();
  }

  start() {
    this.dataBaseConnection();
    this.seedDatabase();
    this.initializeGRPCServer();
  }
  
  private initializeGRPCServer() {
    
    const server = serverBuilder<ServerBuilder>('src/discount.proto', 'discount');

    server.addDiscountService({
      get(request) {
        const discountService = new DiscountService();
        return from(discountService.get(request.userId, request.productId));
      },
    });

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