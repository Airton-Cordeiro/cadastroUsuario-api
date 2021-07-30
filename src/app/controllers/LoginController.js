import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/User';
import configAuth from '../../config/auth';

class LoginController{
    async store(req,res){
        const { email, password } = req.body;

        const userExiste = await User.findOne({ email: req.body.email })
        if(!userExiste){
            return res.status(401).json({
                error: true,
                code: 110,
                message: "Error: Usuário não está cadastrado!"
            });
        }

        if(! (await bcrypt.compare(password, userExiste.password ))){
            return res.status(401).json({
                error: true,
                code: 111,
                message: "Error: Senha inválida!"
            });
        }

        res.json({
            
            user:{
                id: userExiste._id,
                name: userExiste.name,
                email
            },  
            token: jwt.sign({id: userExiste._id}, configAuth.secret, {expiresIn: configAuth.expiresIn})
        })
    }
}

export default new LoginController();