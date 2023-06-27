import express from 'express';
import productsController from './controllers/products.controller';
import orderController from './controllers/order.controller';
import loginController from './controllers/login.controller';

const app = express();

app.use(express.json());

app.get('/products', productsController.allProducts);
app.post('/products', productsController.createProduct);

app.get('/orders', orderController.allOrders);

app.post('/login', loginController.login);

export default app;
