import { Router } from 'express'
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/user.controller';

export const userRouter = Router()

userRouter.get('/', getUsuarios)
userRouter.get('/:id', getUsuario)
userRouter.post('/', postUsuario)
userRouter.put('/', putUsuario)
userRouter.delete('/:id', deleteUsuario)
