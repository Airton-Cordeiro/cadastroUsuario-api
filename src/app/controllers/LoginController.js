import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import User from '../models/User';
import configAuth from '../../config/auth';

class LoginController {
    async store(req, res) { 
        const { email, password } = req.body;

        const userExiste = await User.findOne({email: email});

        if(!userExiste){
            return res.status(401).json({
                error: true,
                code: 110,
                message: "Erro: Usuário não encontrado!"
            })
        }

        if(! (await bcrypt.compare(password, userExiste.password))){
            return res.status(401).json({
                error: true,
                code: 111,
                message: "Erro: Senha inválida!"
            })
        }

        return res.json({
            user: {
                id: userExiste._id,
                name: userExiste.name,
                email
            },
            token: jwt.sign({id: userExiste._id}, configAuth.secret, {expiresIn: configAuth.expiresIn}),
        })
    }

    
}

export default new LoginController();