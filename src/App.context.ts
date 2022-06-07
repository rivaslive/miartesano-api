import models, { GraphqlModels } from './App.models';
import categoryRepository from './modules/category/infrastructure/repositories';
import userRepository from './modules/users/infrastructure/repositories';

export type GraphqlContext = {
  Category: typeof categoryRepository;
  User: typeof userRepository;
  models: GraphqlModels;
};

const contextGraphql: GraphqlContext = {
  Category: categoryRepository,
  User: userRepository,
  models,
};

export default contextGraphql;
