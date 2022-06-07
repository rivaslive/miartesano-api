import { Model } from 'mongoose';

import CategoryModel, {
  CategoryDBType,
} from '@modules/category/domain/models/category.model';

import LocationModel, {
  LocationDBType,
} from '@modules/location/domain/models/location.model';

export type GraphqlModels = {
  Category: Model<CategoryDBType>;
  Location: Model<LocationDBType>;
};

const modules: GraphqlModels = {
  Category: CategoryModel,
  Location: LocationModel,
};

export default modules;
