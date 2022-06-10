import { Model } from 'mongoose';

import FileModel, { FileDBType } from '@modules/file/domain/models';
import SellerModel, { SellerDBType } from '@modules/seller/domain/models';
import SaleModel, { SaleDBType } from '@modules/sale/domain/models';
import LocationModel, { LocationDBType } from '@modules/location/domain/models';
import ProductModel, { ProductDBType } from '@modules/product/domain/models';
import CardModel, { CardDBType } from '@modules/card/domain/models';
import PaymentModel, { PaymentDBType } from '@modules/payment/domain/models';
import CategoryModel, {
  CategoryDBType,
} from '@modules/category/domain/models/category.model';

export type GraphqlModels = {
  Category: Model<CategoryDBType>;
  Location: Model<LocationDBType>;
  Seller: Model<SellerDBType>;
  File: Model<FileDBType>;
  Sale: Model<SaleDBType>;
  Product: Model<ProductDBType>;
  Card: Model<CardDBType>;
  Payment: Model<PaymentDBType>;
};

const models: GraphqlModels = {
  Category: CategoryModel,
  Location: LocationModel,
  Seller: SellerModel,
  File: FileModel,
  Sale: SaleModel,
  Product: ProductModel,
  Card: CardModel,
  Payment: PaymentModel
};

export default models;
