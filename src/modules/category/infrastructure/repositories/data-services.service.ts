import CategoryModel, { CategoryDBType } from '../../domain/models';
import { DataRepository } from './data-services.repository';

const serviceRepository = new DataRepository<CategoryDBType>(
  CategoryModel,
  ['image']
);

export default serviceRepository;
