import { gql } from 'graphql-tag';
import { IMAGE_TYPE } from '@shared/graphql/types';

const types = gql`
  type Query {
    payment(id: ID!): Payment!
    payments: [Payment]!
  }

  type Mutation {
    createPayment(data: PaymentInput): Payment!
    updatePayment(id: ID!, payload: UpdatePaymentInput!): Payment!
    deletePayment(id: ID!): SuccessAction!
  }

  input PaymentInput {
    charge: Float!
    method: MethodType!
    image: ID
    card: ID
    reference: String
    notes: String
    raw: String
    failedReason: String
  }

  input UpdatePaymentInput {
    method: MethodType
    image: ID
    card: ID
    reference: String
    notes: String
    raw: String
    failedReason: String
  }

  type Payment {
    id: ID!
    charge: Float!
    method: MethodType!
    image: ImageType
    card: Card
    reference: String
    notes: String
    raw: String
    failedReason: String
    status: StatusType
  }

  type SuccessAction {
    success: Boolean!
  }

  type Card {
    id: ID!
    cardNumber: String!
  }

  enum MethodType {
    card
    transference
  }

  enum StatusType {
    processing
    cancelled
    failed
    success
  }

  ${IMAGE_TYPE}
`;

export default types;
