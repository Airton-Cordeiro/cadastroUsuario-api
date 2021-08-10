import { Router } from 'express';
import mongoose from 'mongoose';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import PerfilController from './app/controllers/PerfilController';

import authMiddleware from '../src/app/middlewares/auth';

const routes = new Router();

//Rotas users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

//Rotas Profile
routes.get("/perfil", authMiddleware, PerfilController.show)
routes.put("/perfil", authMiddleware, PerfilController.update)

//Rotas Login
routes.post('/login', LoginController.store);


export default routes;
