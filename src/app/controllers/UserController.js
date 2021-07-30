import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6)
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        }

        const emailExiste = await User.findOne({ email: req.body.email });
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este e-mail já está cadastrado!"
            });
        }
        
        var dados = req.body;
        dados.password = await bcrypt.hash(dados.password, 8);

        const user = await User.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Usuário não foi cadastrado com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso!",
                dados: user
            })
        });
    }
}

export default new UserController();