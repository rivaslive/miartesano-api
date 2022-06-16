import type { IResolvers } from '@graphql-tools/utils';

import { GraphqlContext } from 'App.context';
import { response } from '@shared/transformation';
// import { parseToDecimal } from '@shared/utils/parser';
import { ImageDBType } from '@shared/graphql/schemas/image';

type BannerType = {
  id: ID;
  name: string;
  image: ImageDBType;
};

type MiniBannerType = {
  id: ID;
  image: ImageDBType;
};

const banners: BannerType[] = [
  {
    id: '1',
    name: 'This is a title',
    image: {
      url: 'https://i.pinimg.com/originals/a4/28/4c/a4284ca977ad9af0c0d3ce39c2ceddef.jpg',
    },
  },
  {
    id: '2',
    name: 'This is a title',
    image: {
      url: 'https://www.elmueble.com/medio/2021/03/04/salon-exterior-con-sofa-de-bambu-00527490_o_991bb36e_1500x2000.jpg',
    },
  },
];

const miniBanners: MiniBannerType[] = [
  {
    id: '1',
    image: {
      url: 'https://i.ebayimg.com/images/g/OR0AAOSws9JiowQB/s-l960.webp',
    },
  },
  {
    id: '2',
    image: {
      url: 'https://i.ebayimg.com/images/g/EdkAAOSwFuNioxVr/s-l960.webp',
    },
  },
  {
    id: '3',
    image: {
      url: 'https://i.ebayimg.com/images/g/lNIAAOSw-cpiowXP/s-l960.webp',
    },
  },
];

const Query: IResolvers<any, GraphqlContext> = {
  homeLayout: async (_root, _args, context) => {
    try {
      const products = await context.Product.find({}, 8);

      return {
        banners,
        miniBanners,
        products,
      };
    } catch (error) {
      return response.error(error);
    }
  },
};

const Mutation: IResolvers<any, GraphqlContext> = {};

export default { Query, Mutation };
