import DataBaseConfiguration from './infrastructure/config/databaseConfiguration';
import { serverBuilder } from 'rxjs-grpc';
import { discount } from './grpc-namespaces';
import User from './domain/model/user';
import { injectable, inject } from 'inversify';
import { TYPES } from './infrastructure/config/types';
import { DiscountServiceGrpc } from './discountServiceGrpc';

type ServerBuilder = discount.ServerBuilder;

@injectable()
class App {
  private database: DataBaseConfiguration;
  private discountServiceGrpc: DiscountServiceGrpc;

  constructor(@inject(TYPES.Database) database: DataBaseConfiguration, @inject(TYPES.DiscountServiceGrpc) discountService: DiscountServiceGrpc) {
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

    await User.findOneAndRemove({id: 1})
    await User.create({id: 1, firstName: 'Victor', lastName: 'Monte', dateOfBirth: Date()});

    console.log("Seed database finised");
  }
}

export default App;