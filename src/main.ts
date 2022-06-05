import 'dotenv/config';
import initializeServer from './infrastructure/server';

const startServer = initializeServer();

export default startServer;
