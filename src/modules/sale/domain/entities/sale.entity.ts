type Status =
  | 'draft'
  | 'waiting'
  | 'approved'
  | 'delivery'
  | 'rejected'
  | 'completed';

export const status: Status[] = [
  'draft',
  'waiting',
  'approved',
  'delivery',
  'rejected',
  'completed',
];

export type ItemSchemaDBType = {
  subTotal: number;
  quantity: number;
  product: any;
  createdAt?: Date;
};

export type SaleDBType = {
  user: any;
  discount?: number;
  subTotal?: number;
  total?: number;
  delivery?: number;
  direction?: string;
  items?: ItemSchemaDBType[];
  status?: Status;
  createdAt?: Date;
};
