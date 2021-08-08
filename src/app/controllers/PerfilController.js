import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User'

class PerfilController {
    async show(req,res){
        User.findOne({_id:req.userId}, '_id name email createdAt updatedAt')
        .then((user)=>{
            return res.json({
                error: false,
                user: user
            })
        }).catch((erro)=>{
            return res.status(400).json({
                error: true,
                code: 115,
                message: "Error: perfil não encontrado!"
            })
        })
    }
}

export default new PerfilController();