import { AuthenticationError } from 'apollo-server';
import { GraphqlContext } from 'App.context';

type RootType = any;
type ArgsType = any;
type ContextType = GraphqlContext;

type NextType = (
  root: RootType,
  args: ArgsType,
  context: ContextType,
  info?: RootType
) => Error | object;

// eslint-disable-next-line arrow-body-style
export const withAuth = (next: NextType) => {
  return (root: RootType, args: ArgsType, context: ContextType, info?: RootType) => {
    if (!context.user) {
      return new AuthenticationError(`Unauthenticated!`);
    }

    return next(root, args, context, info);
  }
};
