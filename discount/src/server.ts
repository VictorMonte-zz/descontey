import DataBase from './config/db';
import { of } from 'rxjs';
import { serverBuilder } from 'rxjs-grpc';

import { discount } from './grpc-namespaces';

class App {
  
  private database: DataBase;

  constructor() {
    this.database = new DataBase();
    this.dataBaseConnection();
}
  
  dataBaseConnection() {
    this.database.createConnection();
  }

  closeDataBaseConnection(message, callback) {
    this.database.closeConnection(message, () => callback());
  }

  main() {
    type ServerBuilder = discount.ServerBuilder;
    const server = serverBuilder<ServerBuilder>('src/discount.proto', 'discount');
  
    server.addDiscountService({
      get(request) {
        return of({
          porcent: "1",
          valueInCents: "2"
        });
      },
    });
  
    server.start('0.0.0.0:50051');
  }
}

var app = new App();

app.main();

process.once('SIGUSR2', () => app.closeDataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => app.closeDataBaseConnection('execução foi interrompida', () => process.exit(0)));