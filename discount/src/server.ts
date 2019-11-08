import container from "./infrastructure/config/Inversify.config";
import App from "./app";
import { TYPES } from "./infrastructure/config/Types";

let app = container.get<App>(TYPES.App);

app.boostrap();

// close db connection
process.once('SIGUSR2', () => app.closeDataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => app.closeDataBaseConnection('execução foi interrompida', () => process.exit(0)));