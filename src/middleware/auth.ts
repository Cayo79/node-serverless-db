import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: jwt.Secret = '0.ga1tn4a51CM'

export interface CustomRequest extends Request {
 token: string | jwt.JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
    throw new Error();
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;
   next();
 } catch (err) {
    var msj = {}
    if (err == 'TokenExpiredError: jwt expired') {
        msj = { mensaje: 'Token Expirado' }
    } else {
        msj = { mensaje: 'Debe Autenticarse' }
    }
    res.status(401).send(msj);
    }
} 