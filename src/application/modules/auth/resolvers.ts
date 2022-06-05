import { response } from '@infrastructure/transformation';

const Query = {
  Profile: async (_root, args, context: ContextType) => {
    try {
      const query = context.db.models.User.findById(args.id);
      return await query.exec();
    } catch (error) {
      throw response.error(error);
    }
  },
};

const Mutation = {
  updateUser: async (_root, { data, id }, context) => {
    try {
      return await context.db.models.User.findByIdAndUpdate(id, data);
    } catch (error) {
      throw response.error(error);
    }
  },
};

export default { Query, Mutation };
