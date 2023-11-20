import { Router } from 'express';
import user from './user';
import auth from './auth';
import category from './category';
import product from './product';
import profile from './profile';

const routes = Router();
routes.use('/user', user);
routes.use('/auth', auth);
routes.use('/category',category)
routes.use('/product',product) 
routes.use('/profile',profile)


export default routes;