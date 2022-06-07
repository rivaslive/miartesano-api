import authModule from '@modules/auth/infrastructure';
import categoryModule from './modules/category/infrastructure';

const modules = {
  typeDefs: [authModule.typeDefs, categoryModule.typeDefs],
  resolvers: [authModule.resolvers, categoryModule.resolvers],
};

export default modules;
