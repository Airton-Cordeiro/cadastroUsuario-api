import { Router } from 'express';
import mongoose from 'mongoose';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController'

import authMiddleware from '../src/app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.delete('/users/:id', authMiddleware, UserController.delete);
routes.post('/login', LoginController.store);


export default routes;
