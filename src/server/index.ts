import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';

import config from 'config';
import { initializeDB } from 'config/db';
import {Context} from 'apollo-server-core/dist/types';

const { port } = config;

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

  // create server HTTP
  const httpServer = http.createServer(app);

  // creating Apollo server
  const server = new ApolloServer<T>({
    context: context as unknown as Context,
    typeDefs: modules.typeDefs,
    resolvers: modules.resolvers,
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
