import ProductModel from '@modules/product/domain/models';
import type { ProductDBType } from '@modules/product/domain/entities';
import { DataRepository } from './data-services.repository';

const userServiceRepository = new DataRepository<ProductDBType>(ProductModel, [
  'thumbnail',
  'images',
  'category',
  'seller',
]);

export default userServiceRepository;
