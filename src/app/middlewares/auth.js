import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import configAuth from '../../config/auth'

export default async (req, res, next) => {

    const authHeader = req.headers.authorization;

    const [bearer, token]  = authHeader.split(' ');

    if(!authHeader){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Token não encontrado"
        })
    }

    try{
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);

        req.userId = decoded.id;
        
        return next();
    }catch(err){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Token não encontrado"
        })
    }

    //console.log(token)

    
}