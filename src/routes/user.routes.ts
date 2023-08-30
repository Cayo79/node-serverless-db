import { Router } from 'express';
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
  putClave,
  login
} from '../controllers/user.controller';
import { auth } from '../middleware/auth';

export const userRouter = Router();

userRouter.get('/', auth, getUsuarios);
userRouter.get('/:id', getUsuario);
userRouter.post('/', postUsuario);
userRouter.post('/login', login);
userRouter.put('/', putUsuario);
userRouter.put('/passwd', putClave);
userRouter.delete('/:id', deleteUsuario);
