const connection = require('../database/connection');
const dbSettings = require("../../dbSettings");
const jwt = require("jsonwebtoken");
const { json } = require('body-parser');

module.exports = {
    async logar(req, res) {
        const users = await connection(dbSettings.users_table)
            .where(dbSettings.users_status_col, "=", 1)
            .select('*');

            const usuarios = users.map((usuario) => {
                return {
                    id: usuario.id_user,
                    nome: usuario.nome,
                    nivel: usuario.nivel,
                    usuario: usuario.usuario,
                    senha: usuario.senha,
                    status: usuario.status,
                    email: usuario.email,
                };
              });
           
            var nomeUsuario = req.body.dadosUsuario.usuario;
            var senhaUsuario = req.body.dadosUsuario.senha;

        const user = usuarios.find(user => user.usuario === nomeUsuario);
        const userPass = usuarios.find(pass => pass.senha === senhaUsuario);

        try{
            
            if(user == null) {
                return res.status(400).send('usuário não encontrado')
            }else if(user.senha != senhaUsuario) {
                return res.status(400).send('senha inválida')
            }
            const token = jwt.sign({
                idUser: user.id_user,
                nomeUser: user.nome,
                email: user.email,
                nivel: user.nivel
            }, 'secretTokenModoGarcom', {expiresIn: '10h'});
            return res.json({
                auth: true,
                token: token,
                mensagem: 'Login efetuado com sucesso!!!'
            });
              
        } catch{
            res.json({
                auth: false,
                mensagem: 'Login não efetuado!'
            })
        }
       
    }
}