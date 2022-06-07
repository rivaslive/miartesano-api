import CategoryModel, {
  CategoryDBType,
} from '@modules/category/domain/models/category.model';
import { CategoryRepository } from './data-services.repository';

const userServiceRepository = new CategoryRepository<CategoryDBType>(
  CategoryModel,
  ['image']
);

export default userServiceRepository;
