import type { IResolvers } from '@graphql-tools/utils';

import { GraphqlContext } from 'App.context';
import { response } from '@shared/transformation';
import { withAuth } from '@shared/middlewares/withAuth';
import { createHiddenCard } from '@modules/card/application/utils';

const Query: IResolvers<any, GraphqlContext> = {
  cards: withAuth(async (_root, _args, context) => {
    try {
      const userId = context?.user?.id as ID;
      return await context.Card.find({
        user: userId,
      });
    } catch (error) {
      return response.error(error);
    }
  }),
  card: withAuth(async (_root, { id }, context) => {
    try {
      const userId = context?.user?.id as ID;
      return await context.Card.findOne({
        id,
        user: userId,
      });
    } catch (error) {
      return response.error(error);
    }
  }),
};

const Mutation: IResolvers<any, GraphqlContext> = {
  createCard: withAuth(async (_root, { data }, context) => {
    try {
      const originalCardNumber = data.cardNumber;

      if (originalCardNumber.length !== 16) {
        return response.error(new Error('Card number must be 16 digits'));
      }

      const findCard = await context.Card.findOne({
        originalCardNumber,
      });

      if (findCard?.status === 'blacklist') {
        return response.error('Card not valid');
      }

      const userId = context?.user?.id as ID;

      const cardNumber = createHiddenCard(originalCardNumber);

      return await context.Card.create({
        ...data,
        cardNumber,
        user: userId,
        originalCardNumber,
      });
    } catch (error) {
      return response.error(error);
    }
  }),
  updateCard: withAuth(async (_root, { id, data }, context) => {
    try {
      const userId = context?.user?.id as ID;
      const card = await context.Card.findOne({
        id,
        user: userId,
      });

      if (!card) return response.error('Card not found');
      return await context.Card.update(id, data);
    } catch (error) {
      return response.error(error);
    }
  }),
  deleteCard: withAuth(async (_root, { id }, context) => {
    try {
      const success = await context.Card.delete(id);
      return {
        success: !!success,
      };
    } catch (error) {
      return response.error(error);
    }
  }),
};

export default { Query, Mutation };
