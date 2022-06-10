import type { IResolvers } from '@graphql-tools/utils';

import { GraphqlContext } from 'App.context';
import { response } from '@shared/transformation';
import { parseToDecimal } from '@shared/utils/parser';

const Query: IResolvers<any, GraphqlContext> = {
  products: async (_root, _args, context) => {
    try {
      return await context.Product.find();
    } catch (error) {
      return response.error(error);
    }
  },
  product: async (_root, { id }, context) => {
    try {
      return await context.Product.findById(id);
    } catch (error) {
      return response.error(error);
    }
  },
};

const Mutation: IResolvers<any, GraphqlContext> = {
  createProduct: async (_root, { data }, context) => {
    try {
      return await context.Product.create({
        ...data,
        price: parseToDecimal(data.price),
      });
    } catch (error) {
      return response.error(error);
    }
  },
  updateProduct: async (_root, { id, data }, context) => {
    const payload = data?.price
      ? { ...data, price: parseToDecimal(data.price) }
      : data;

    try {
      return await context.Product.update(id, payload);
    } catch (error) {
      return response.error(error);
    }
  },
  deleteProduct: async (_root, { id }, context) => {
    try {
      const deleted = await context.Product.delete(id);
      return {
        deleted: !!deleted,
      };
    } catch (error) {
      return response.error(error);
    }
  },
};

export default { Query, Mutation };
