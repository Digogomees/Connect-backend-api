const connection = require("../database/connection")
const jwt = require('jsonwebtoken')
const authSecret  = require('../config')

function generateToken(params = {}) {
    return jwt.sign(params, authSecret.SECRETJWT, {
        expiresIn: '10m'
    })
}

module.exports = {
    async index(req, res) {
        try{

            const {email, password} = req.body
            const findUser = await connection('register')
            .where({
                email: email,
                password: password
            })
            .first()
            .select("id", "email", "category")

            if(!findUser) return res.status(401).send({ erro: 'Usuário não encontrado!' })

            return res.status(200).send({
                token: generateToken({id: findUser.id, category: findUser.category})
            })
            
        } catch(err) {
            return res.status(400).send({
                erro: 'Algo deu errado na autenticação!'
            })
        }
    },

    async getUserInfo (req, res) {
        try{
            const authorization = req.headers["authorization"]
            const token = authorization && authorization.split(" ")[1]
            const decoded = jwt.decode(token, authSecret.SECRETJWT)
            const id = decoded?.id

            const findUser = await connection('register')
            .where({id: id})
            .first()
            .select("id", "name", "email", "category")

            if(!findUser) return res.status(401).send({ erro: 'Usuário não encontrado!' })

            return res.status(200).send(findUser)
            
        } catch(err) {
            console.log(err)
            return res.status(400).send({
                erro: 'Algo deu errado na autenticação!'
            })
        }
    }
}