import http from 'http';
import express, { Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import config from 'config';

import { initializeDB } from 'config/db';
import security from '@shared/utils/auth';

// @ts-ignore
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
// @ts-ignore
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import routes from './routes';

const { port, publicPath, uploadPath, isProd } = config;

type ModulesType = {
  typeDefs: any[];
  resolvers: any[];
};

// creating server
const initializeServer = async <T>({
  modules,
  context,
}: {
  context: T;
  modules: ModulesType;
}) => {
  // initialize DB
  await initializeDB();

  // create express app
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(publicPath));
  app.use('/public', express.static(uploadPath));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  // set routes for view image
  app.use(routes);

  // create server HTTP
  const httpServer = http.createServer(app);

  // creating Apollo server
  const server = new ApolloServer<T>({
    csrfPrevention: isProd,
    context: async ({ req }: { req: Request }) => {
      const user = await security.getUser(req.headers.authorization || '');
      return { ...context, user };
    },
    typeDefs: modules.typeDefs,
    resolvers: [
      {
        Upload: GraphQLUpload,
      },
      ...modules.resolvers,
    ],
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground({}),
    ],
  });

  // start server
  await server.start();

  // set url to graphql
  server.applyMiddleware({
    app,
    path: '/api/graphql',
  });

  httpServer.listen({ port }, () => {
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

export default initializeServer;
