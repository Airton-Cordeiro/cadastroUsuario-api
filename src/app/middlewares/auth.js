import jwt from 'jsonwebtoken';
import { promisify } from "util";
import configAuth from "../../config/auth";

export default async(req, res, next) =>{

    const authHeader = req.headers.authorization
    
    if(!authHeader){
        return res.status(400).json({
            error: true,
            code: 130,
            message: "Erro: Token não encontrado"
        })
    }

    const [Bearer, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);
        //console.log(decoded)
        req.userId = decoded.id;
        
        return next();
    } catch (err) {
        return res.status(400).json({
            error: true,
            code: 131,
            message: "Erro: Token inválido"
        })
    }
    
    //console.log("Token válido: ", token)
    
}