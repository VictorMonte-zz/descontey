import App from './app';

const app = new App();
app.start();

// close db connection
process.once('SIGUSR2', () => app.closeDataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => app.closeDataBaseConnection('execução foi interrompida', () => process.exit(0)));