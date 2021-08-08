import { Router } from 'express';
import mongoose from 'mongoose';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController'

import authMiddleware from '../src/app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);
routes.post('/login', LoginController.store);


export default routes;
