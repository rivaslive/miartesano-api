import { Schema } from 'mongoose';

export type ProductDBType = {
  name: string;
  category: Schema.Types.ObjectId;
  thumbnail: Schema.Types.ObjectId;
  images: Schema.Types.ObjectId[];
  description: string;
  price: number;
  stock: number;
  seller: Schema.Types.ObjectId;
  specs?: string;
  status?: StatusType;
  createdAt?: Date;
};
