import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  token: string | jwt.JwtPayload;
}

class Auth {
  private readonly SECRET_KEY: jwt.Secret = '0.ga1tn4a51CM';

  public auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(token, this.SECRET_KEY);
      (req as CustomRequest).token = decoded;
      next();
    } catch (err) {
      let msj = {};
      if (err === 'TokenExpiredError: jwt expired') {
        msj = { mensaje: 'Token Expirado' };
      } else {
        msj = { mensaje: 'Debe Autenticarse' };
      }
      res.status(401).send(msj);
    }
  };
}

const instance = new Auth();

export default instance.auth;
