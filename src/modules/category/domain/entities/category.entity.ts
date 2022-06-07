import { ImageDBType } from '@shared/graphql/schemas/image';

export type CategoryDBType = {
  name: string;
  image: ImageDBType;
  status: StatusType;
  createdAt?: Date;
};
