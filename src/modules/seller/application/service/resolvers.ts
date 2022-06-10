import type { IResolvers } from '@graphql-tools/utils';

import { response } from '@shared/transformation';
import { GraphqlContext } from 'App.context';

const Query: IResolvers<any, GraphqlContext> = {
  sellers: async (_root, args, context) => {
    try {
      return await context.Seller.find(args);
    } catch (error) {
      return response.error(error);
    }
  },
  seller: async (_root, { id }, context) => {
    try {
      return await context.Seller.findById(id);
    } catch (error) {
      return response.error(error);
    }
  },
};

const Mutation: IResolvers<any, GraphqlContext> = {
  createSeller: async (_root, { data }, context) => {
    try {
      return await context.Seller.create(data);
    } catch (error) {
      return response.error(error);
    }
  },
  updateSeller: async (_root, { id, data }, context) => {
    try {
      return await context.Seller.update(id, data);
    } catch (error) {
      return response.error(error);
    }
  },
  deleteSeller: async (_root, { id }, context) => {
    try {
      return await context.Seller.delete(id);
    } catch (error) {
      return response.error(error);
    }
  },
};

export default { Query, Mutation };
