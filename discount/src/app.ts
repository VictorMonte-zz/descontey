import DataBase from './config/db';
import { of } from 'rxjs';
import { serverBuilder } from 'rxjs-grpc';
import { discount } from './grpc-namespaces';
import DiscountService from './modules/discount/DiscountService';
import Discount from './modules/discount/Discount';
import { promises } from 'dns';

type ServerBuilder = discount.ServerBuilder;

class App {
  
  private database: DataBase;
  server: any;

  constructor() {
    this.database = new DataBase();
  }

  start() {

    this.dataBaseConnection();

    this.seed();

    this.runGrpcServer();

  }
  
  private runGrpcServer() {
    
    this.server = serverBuilder<ServerBuilder>('discount.proto', 'discount');

    this.server.addDiscountService({
      get(request) {
        
        const discountService = new DiscountService();

        const discount = discountService.get(request.userId, request.productId);

        console.log("Response from GRPC server " + discount.valueInCents);

        return of({
          porcent: discount.porcent,
          valueInCents: discount.valueInCents
        });
      },
    });

    this.server.start('0.0.0.0:50051');

    console.log('Discount microservice running on 0.0.0.0:50051');
  }

  dataBaseConnection() {
    this.database.createConnection();
  }

  closeDataBaseConnection(message, callback) {
    this.database.closeConnection(message, () => callback());
  }

  seed() {

    console.log("Starting seeding...");

    // Remove test user
    // UserRepository
    //   .deleteMany({id: "1"})
    //   .then(user => console.log("Seed user removed"))
    //   .catch(err => console.error(err));

    // // Add test user
    // UserRepository
    //   .create({id: '1', firstName: 'Victor', lastName: 'Monte', dateOfBirth: new Date()})
    //   .then(user => console.log("Seed user created"))
    //   .catch(err => console.error(err));
  }
}

export default App;