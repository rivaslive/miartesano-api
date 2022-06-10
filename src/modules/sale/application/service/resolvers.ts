import type { IResolvers } from '@graphql-tools/utils';

import { GraphqlContext } from 'App.context';
import { response } from '@shared/transformation';
import { withAuth } from '@shared/middlewares/withAuth';
import SaleAction from './data-actions';

const Query: IResolvers<any, GraphqlContext> = {
  shoppingCart: withAuth(async (_root, _args, context) => {
    try {
      const sale = new SaleAction(context);
      return await sale.getSale();
    } catch (error) {
      return response.error(error);
    }
  }),
  sale: withAuth(async (_root, { id }, context) => {
    try {
      const sale = new SaleAction(context);
      return await sale.getSale(id);
    } catch (error) {
      return response.error(error);
    }
  }),
};

const Mutation: IResolvers<any, GraphqlContext> = {
  addItemCart: withAuth(async (_root, { id, quantity }, context) => {
    try {
      const sale = new SaleAction(context);
      const success = await sale.addItem(id, quantity);
      return {
        success: !!success,
      };
    } catch (error) {
      return response.error(error);
    }
  }),
  clearItemsCart: withAuth(async (_root, _args, context) => {
    try {
      const sale = new SaleAction(context);
      const success = await sale.clear();
      return {
        success: !!success,
      };
    } catch (error) {
      return response.error(error);
    }
  }),
  removeItemCart: withAuth(async (_root, { id }, context) => {
    try {
      const sale = new SaleAction(context);
      const success = await sale.deleteItem(id);
      return {
        success: !!success,
      };
    } catch (error) {
      return response.error(error);
    }
  }),
};

export default { Query, Mutation };
