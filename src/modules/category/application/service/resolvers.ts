import type { IResolvers } from '@graphql-tools/utils';

import { response } from '@shared/transformation';
import { GraphqlContext } from 'App.context';

const Query: IResolvers<any, GraphqlContext> = {
  categories: async (_root, _args, context) => {
    try {
      return await context.Category.find({});
    } catch (error) {
      return response.error(error);
    }
  },
  category: async (_root, { id }, context) => {
    try {
      return await context.Category.findById(id);
    } catch (error) {
      return response.error(error);
    }
  },
};

const Mutation: IResolvers<any, GraphqlContext> = {
  createCategory: async (_root, { data }, context) => {
    try {
      return await context.Category.create(data);
    } catch (error) {
      return response.error(error);
    }
  },
  updateCategory: async (_root, { id, data }, context) => {
    try {
      return await context.Category.update(id, data);
    } catch (error) {
      return response.error(error);
    }
  },
  deleteCategory: async (_root, { id }, context) => {
    try {
      return await context.Category.delete(id);
    } catch (error) {
      return response.error(error);
    }
  },
};

export default { Query, Mutation };
