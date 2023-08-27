import {Request, Response} from 'express'
import { User } from '../models/user.model'

export const getUsuarios = ( req: Request, res: Response ) => {
    User.findAll().then(sal => {
        res.send(sal);
    })
}

export const getUsuario = ( req: Request, res: Response ) => {
    const id = req.params.id
    User.findByPk(id).then(sal => {
        if (sal)
            res.send(sal);
        else
            res.status(404).json({
                msg: 'No existe un usuario con el id = ' + id
        })
    })
}

export const postUsuario = ( req: Request, res: Response ) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    }).then(sal => {
        // Send created User to client
        res.send(sal);
    })
}

export const putUsuario = ( req: Request, res: Response ) => {
    const id = req.body.id
    User.update({ email: req.body.email },
        { where: { id } }
    ).then(() => {
        res.status(200).json({
            msg: 'updated successfully a User with id = ' + id
        })
    })
}

export const deleteUsuario = ( req: Request, res: Response ) => {
    const id = req.params.id
    User.destroy({
        where: { id }
    }).then(() => {
        res.status(200).json({
            msg: 'deleted successfully a User with id = ' + id
        })
    })
}

