type UserModel = import('@domain/models/users/schema');

declare type StatusType = 'active' | 'inactive';

declare type ContextType = {
  db: {
    models: { User: UserModel };
  };
};
