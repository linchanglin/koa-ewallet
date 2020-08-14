// src/routes.ts
import Router from '@koa/router';

import AuthController from './controllers/auth';
import UserController from './controllers/user';
import EwalletController from './controllers/ewallet';


// const router = new Router();

// // auth 相关的路由
// router.post('/auth/login', AuthController.login);
// router.post('/auth/register', AuthController.register);

// // users 相关的路由
// router.get('/users', UserController.listUsers);
// router.get('/users/:id', UserController.showUserDetail);
// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

// export default router;


const unprotectedRouter = new Router();

// auth 相关的路由
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);

unprotectedRouter.get('/test', AuthController.test);

unprotectedRouter.post('/deposit', EwalletController.bindAccountNumber);
unprotectedRouter.get('/ewallet', EwalletController.getBalance);
unprotectedRouter.patch('/ewallet', EwalletController.topUp);
unprotectedRouter.get('/user_qrcode', EwalletController.getUserQrcode);




const protectedRouter = new Router();

// users 相关的路由
protectedRouter.get('/users', UserController.listUsers);
protectedRouter.get('/users/:id', UserController.showUserDetail);
protectedRouter.put('/users/:id', UserController.updateUser);
protectedRouter.delete('/users/:id', UserController.deleteUser);



// ewallet 相关的路由



export { protectedRouter, unprotectedRouter };
