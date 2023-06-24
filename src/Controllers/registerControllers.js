const connection = require("../database/connection")

module.exports = {
    async create(req, res) {
        try {
            const { name, email, password, category } = req.body

            await connection('register').insert({
                name,
                email,
                password,
                category
            })

            return res.status(201).send({
                message: 'Usuário criado!'
            })

        } catch (err) {
            console.log('resgiter *** => ', err)
            return res.status(400).send({error: 'Registro falhou!'})
        }
    },

    async index(req, res) {
        // const params = req.query
        try {
            const users = await connection('register').select('register.*')
            return res.status(200).send(users)

        } catch (err) {
            console.log('lista de usuário *** => ', err)
            return res.status(400).send({error: 'Listagem de usuário falhou!'})
        }
    }
};