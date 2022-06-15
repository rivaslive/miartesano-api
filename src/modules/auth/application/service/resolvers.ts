import { Error } from 'mongoose';
import type { IResolvers } from '@graphql-tools/utils';

import { GraphqlContext } from 'App.context';
import security from '@shared/utils/auth';
import encrypt from '@shared/utils/encrypt';
import { response } from '@shared/transformation';

const Query: IResolvers<any, GraphqlContext> = {
  Profile: async (_root, args, context) => {
    try {
      return await context.User.findOne(args.id);
    } catch (error) {
      return response.error(error);
    }
  },
};

const Mutation: IResolvers<any, GraphqlContext> = {
  login: async (_root, { email, password }, context) => {
    try {
      const user = await context.User.findOne({ email }).select('+password');

      if (!user) {
        const error = new Error('User not found');
        return response.error(error);
      }

      const isPasswordValid = await encrypt.compare(password, user.password);

      if (!isPasswordValid) {
        const error = new Error('Email or password not match');
        return response.error(error);
      }

      if (user.jwt) {
        const verifyToken = await security.verify(user.jwt);
        if (verifyToken) {
          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            avatar: user.avatar,
            jwt: user.jwt,
          };
        }
      }

      const jwt = await security.create(user.toJSON());
      user.jwt = jwt;
      await user.save();

      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        avatar: user.avatar,
        jwt,
      };
    } catch (error) {
      return response.error(error);
    }
  },
  signUp: async (_root, { data }, context) => {
    try {
      const password = await encrypt.create(data.password);
      const user = await context.User.create({ ...data, password });
      const jwt = await security.create(user.toJSON());

      user.jwt = jwt;
      await user.save();

      return {
        jwt,
      };
    } catch (error) {
      return response.error(error);
    }
  },
  updateProfile: async (_root, { data, id }, context) => {
    try {
      return await context.User.update(id, data);
    } catch (error) {
      return response.error(error);
    }
  },
};

export default { Query, Mutation };
