import DataBase from './config/db';
import { of } from 'rxjs';
import { serverBuilder } from 'rxjs-grpc';

import { discount } from './grpc-namespaces';
import { Server } from 'mongodb';

type ServerBuilder = discount.ServerBuilder;

class App {
  
  private database: DataBase;
  server: any;

  constructor() {
    this.database = new DataBase();
    this.dataBaseConnection();

    this.server = serverBuilder<ServerBuilder>('src/discount.proto', 'discount');
    this.routes();
    this.server.start('0.0.0.0:50051');
}
  
  dataBaseConnection() {
    this.database.createConnection();
  }

  closeDataBaseConnection(message, callback) {
    this.database.closeConnection(message, () => callback());
  }

  routes() {
    this.server.addDiscountService({
      get(request) {
        return of({
          porcent: "1",
          valueInCents: "2"
        });
      },
    });
  }
}

export default new App();