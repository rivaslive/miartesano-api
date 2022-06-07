import 'dotenv/config';

import modules from './App.module';
import initializeServer from './server';
import contextGraphql, { GraphqlContext } from './App.context';

const startServer = initializeServer<GraphqlContext>({
  modules,
  context: contextGraphql,
});

export default startServer;
