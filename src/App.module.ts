import authModule from './modules/auth/infrastructure';
import categoryModule from './modules/category/infrastructure';
import sellerModule from './modules/seller/infrastructure';
import uploadModule from './modules/file/infrastructure';
import productModule from './modules/product/infrastructure';
import saleModule from './modules/sale/infrastructure';
import cardModule from './modules/card/infrastructure';
import paymentModule from './modules/payment/infrastructure';

const modules = {
  typeDefs: [
    authModule.typeDefs,
    categoryModule.typeDefs,
    sellerModule.typeDefs,
    uploadModule.typeDefs,
    productModule.typeDefs,
    saleModule.typeDefs,
    cardModule.typeDefs,
    paymentModule.typeDefs,
  ],
  resolvers: [
    authModule.resolvers,
    categoryModule.resolvers,
    sellerModule.resolvers,
    uploadModule.resolvers,
    productModule.resolvers,
    saleModule.resolvers,
    cardModule.resolvers,
    paymentModule.resolvers,
  ],
};

export default modules;
