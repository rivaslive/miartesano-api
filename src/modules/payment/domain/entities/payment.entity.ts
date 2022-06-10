type Status = 'processing' | 'cancelled' | 'failed' | 'success';

type MethodType = 'card' | 'transference';

export const methods = ['card', 'transference'];
export const status = ['processing', 'cancelled', 'failed', 'success'];

export type PaymentDBType = {
  charge: number;
  method: MethodType;
  image?: ID;
  card?: ID;
  reference?: ID;
  notes?: string;
  raw?: string;
  failedReason?: string;
  status?: Status;
  createdAt?: Date;
};
