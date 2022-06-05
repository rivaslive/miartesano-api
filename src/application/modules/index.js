import authModule from './auth';

const modules = {
  typeDefs: [authModule.typeDefs],
  resolvers: [authModule.resolvers],
};

export default modules;
