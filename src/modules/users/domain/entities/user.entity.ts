import { ImageDBType } from '@shared/graphql/schemas/image';
import { Schema } from 'mongoose';

export type UserDBType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  municipality: string;
  password: string;
  avatar: ImageDBType;
  status: StatusType;
  jwt?: string;
  addresses?: Schema.Types.ObjectId[];
  createdAt?: Date;
};
