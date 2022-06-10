type Status = StatusType | 'blacklist';

export const status = ['active', 'inactive', 'blacklist'];

export type CardDBType = {
  exp: Date;
  CVC: string;
  lastName: string;
  firstName: string;
  cardNumber: string;
  originalCardNumber: string;
  user: ID,
  status?: Status;
  createdAt?: Date;
};
