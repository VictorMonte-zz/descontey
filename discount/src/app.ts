import DataBaseConfiguration from './infrastructure/config/DatabaseConfiguration';
import { serverBuilder } from 'rxjs-grpc';
import { discount } from './presentation/grpc/grpc-namespaces';
import User from './infrastructure/dataModel/User';
import { injectable, inject } from 'inversify';
import { TYPES } from './infrastructure/config/Types';
import { DiscountServiceGrpc } from './presentation/grpc/DiscountServiceGrpc';

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