import SaleModel, { SaleDBType } from '../../domain/models';
import { DataRepository } from './data-services.repository';

const serviceRepository = new DataRepository<SaleDBType>(SaleModel, [
  'user',
  {
    path: 'items',
    populate: {
      path: 'product',
      model: 'products',
      populate: [
        {
          path: 'thumbnail',
          model: 'files',
        },
        {
          path: 'images',
          model: 'files',
        },
        {
          path: 'category',
          model: 'categories',
        },
      ],
    },
  },
]);

export default serviceRepository;
