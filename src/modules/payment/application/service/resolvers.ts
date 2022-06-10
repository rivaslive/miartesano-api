import type { IResolvers } from '@graphql-tools/utils';

import { GraphqlContext } from 'App.context';
import { response } from '@shared/transformation';
import { withAuth } from '@shared/middlewares/withAuth';

const Query: IResolvers<any, GraphqlContext> = {
  payments: withAuth(async (_root, _args, context) => {
    try {
      return await context.Payment.find();
    } catch (error) {
      return response.error(error);
    }
  }),
  payment: withAuth(async (_root, { id }, context) => {
    try {
      return await context.Payment.findById(id);
    } catch (error) {
      return response.error(error);
    }
  }),
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
