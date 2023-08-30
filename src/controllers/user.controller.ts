import { NextFunction, Request, Response } from 'express';
import { UserInput, User, UserOuput } from '../models/user.model';
import * as Sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';

export const SECRET_KEY: jwt.Secret = '0.ga1tn4a51CM';

async function encriptaPasswd(password) {
  const _saltRounds = 12;

  return bcrypt.hash(password, _saltRounds)
    .then(hash => {
      return hash;
    });
}

async function comparePasswd(password, hash) {
  return bcrypt.compare(password, hash)
    .then(result => {
      return result;
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
}

export const getUsuarios = async (req: Request, res: Response, next: NextFunction)
: Promise<UserOuput[]> => {
  try {
    const r: UserOuput[] = await User.findAll({});
    return r;
  } catch (e) {
    console.error('Error fetching users:', e);
    throw e; // Lanza el error en el bloque 'catch'
  }
};

export const getUsuario = (req: Request, res: Response) => {
  const id = req.params.id;
  User.findByPk(id).then(sal => {
    if (sal) {
      res.send(sal);
    } else {
      res.status(404).json({
        msg: 'No existe un usuario con el id = ' + id
      });
    }
  });
};

export const postUsuario = (req: Request, res: Response) => {
  return encriptaPasswd(req.body.password)
    .then(clave => {
      User.create({
        email: req.body.email,
        password: clave
      }).then(sal => {
        // Send created User to client
        res.send(sal);
      });
    });

};

export const putUsuario = (req: Request, res: Response) => {
  const id = req.body.id;
  User.update({ email: req.body.email, updatedAt: Sequelize.fn('NOW') },
    { where: { id } }
  ).then(() => {
    res.status(200).json({
      msg: 'updated successfully a User with id = ' + id
    });
  });
};

export const putClave = (req: Request, res: Response) => {

  const id = req.body.id;
  return encriptaPasswd(req.body.password)
    .then(clave => {
      User.update({
        password: clave, updatedAt: Sequelize.fn('NOW')
      }, { where: { id } }).then(() => {
        res.status(200).json({
          msg: 'updated successfully a User with id = ' + id
        });
      });
    });
};

export const deleteUsuario = (req: Request, res: Response) => {
  const id = req.params.id;
  User.destroy({
    where: { id }
  }).then(() => {
    res.status(200).json({
      msg: 'deleted successfully a User with id = ' + id
    });
  });
};

export const login = async (req: Request, res: Response) => {
  const clave = req.body.password;
  const sal: UserInput | null = await User.findOne({ where: { email: req.body.email } });
  if (isEmpty(sal) || !clave) {
    res.status(404).json({ msg: 'Loggin incorrecto' });
    return;
  }
  if (await comparePasswd(clave, sal?.password)) {
    res.status(200).json({
      msg: 'Loggin correcto',
      token: jwt.sign({ id: sal?.id, email: sal?.email }, SECRET_KEY, {
        expiresIn: '10h'
      }) // 60, 2 days, 10h, 7d
    });
  }
};
