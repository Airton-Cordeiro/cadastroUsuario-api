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

    async update(req,res){
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            password: Yup.string().min(6)
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Error: Dados do formulário inválido!"
            })

        }

        const { email } = req.body;

        const usuarioExiste = await User.findOne({_id: req.userId})

        if(!usuarioExiste){
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Error: usuario não encontrado!"
            });
        };

        if(email != usuarioExiste.email){
            const emailExiste = await User.findOne({email: email})

            if(emailExiste){
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Esse E-mail já está cadastrado!"
                })
            }
        }

        var dados = req.body;
        if(dados.password){
            dados.password = await bcrypt.hash(dados.password, 8);
        }

        await User.updateOne({_id: req.userId }, dados, (err)=>{
            if(err) return res.status(400).json({
                    error: true,
                    code: 116,
                    message: "Error: usuario não foi Editado com sucesso!"
            });
            
            return res.json({
                error: false,
                message: "Sucesso: usuário editado com sucesso!"
            })

        })

        
    };
}

export default new PerfilController();