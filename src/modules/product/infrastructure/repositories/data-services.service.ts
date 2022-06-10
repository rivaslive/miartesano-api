import ProductModel, { ProductDBType } from '@modules/product/domain/models';
import { ProductRepository } from './data-services.repository';

const productServiceRepository = new ProductRepository<ProductDBType>(
  ProductModel,
  ['thumbnail', 'images', 'seller', 'category']
);

export default productServiceRepository;
