import models, { GraphqlModels } from './App.models';
import categoryRepository from './modules/category/infrastructure/repositories';
import userRepository from './modules/users/infrastructure/repositories';
import sellerRepository from './modules/seller/infrastructure/repositories';
import fileRepository from './modules/file/infrastructure/repositories';
import productRepository from './modules/product/infrastructure/repositories';
import saleRepository from './modules/sale/infrastructure/repositories';
import cardRepository from './modules/card/infrastructure/repositories';
import paymentRepository from './modules/payment/infrastructure/repositories';

type User = null | {
  id: ID;
};

export type GraphqlContext = {
  Category: typeof categoryRepository;
  User: typeof userRepository;
  Seller: typeof sellerRepository;
  File: typeof fileRepository;
  Product: typeof productRepository;
  Sale: typeof saleRepository;
  Card: typeof cardRepository;
  Payment: typeof paymentRepository;
  user: User;
  models: GraphqlModels;
};

const contextGraphql: GraphqlContext = {
  Category: categoryRepository,
  User: userRepository,
  Seller: sellerRepository,
  File: fileRepository,
  Product: productRepository,
  Sale: saleRepository,
  Card: cardRepository,
  Payment: paymentRepository,
  user: null,
  models,
};

export default contextGraphql;
