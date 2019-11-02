import DataBase from './config/db';
import { of } from 'rxjs';
import { serverBuilder } from 'rxjs-grpc';
import { discount } from './grpc-namespaces';
import DiscountService from './modules/discount/DiscountService';
import Discount from './modules/discount/Discount';
import UserRepository from './modules/user/UserRepository';

type ServerBuilder = discount.ServerBuilder;

class App {
  
  private database: DataBase;
  server: any;

  constructor() {
    this.database = new DataBase();
  }

  start() {

    this.dataBaseConnection();

    this.server = serverBuilder<ServerBuilder>('src/discount.proto', 'discount');

    this.server.addDiscountService({
      get(request) {

        const discountService = new DiscountService();
        const discount: Discount = discountService.get(request.userId, request.productId);

        return of({
          porcent: discount.porcent,
          valueInCents: discount.valuesInCents
        });
      },
    });

    this.server.start('0.0.0.0:50051');

    this.seed();
  }
  
  dataBaseConnection() {
    this.database.createConnection();
  }

  closeDataBaseConnection(message, callback) {
    this.database.closeConnection(message, () => callback());
  }

  routes() {
    
  }

  seed() {

    console.log("Starting seeding...");

    // Remove test user
    UserRepository
      .deleteMany({id: "1"})
      .then(user => console.log("Seed user removed"))
      .catch(err => console.error(err));

    // Add test user
    UserRepository
      .create({id: '1', firstName: 'Victor', lastName: 'Monte', dateOfBirth: new Date()})
      .then(user => console.log("Seed user created"))
      .catch(err => console.error(err));
  }
}

export default App;