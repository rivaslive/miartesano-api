import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';

import models from '@domain/models';
import modules from '@application/modules';
import config from '@infrastructure/config';

import { initializeDB } from './db';

const { port } = config;

// creating server
const initializeServer = async () => {
  // initialize DB
  await initializeDB();

  // create express app
  let app = express();

  // create server HTTP
  const httpServer = http.createServer(app);

  // creating Apollo server
  const server = new ApolloServer({
    typeDefs: modules.typeDefs,
    resolvers: modules.resolvers,
    context: {
      db: {
        models,
      },
    },
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
