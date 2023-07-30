
const jwt = require('jsonwebtoken')
const authConfig = require("../config.json")

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header) return res.status(401).send({
        erro: 'Sem token!'
    })

    const bearerParts = header.split(" ")

    if(bearerParts.length !== 2) {
        return res.status(401).send({
            erro: 'Algo de errado no token! verifique o bearer...'
        })
    }

    const [scheme, token] = bearerParts
    const checkBearerRegex = /^Bearer$/i

    if(!checkBearerRegex.test(scheme)) {
        return res.status(401).send({ error: 'Token não formatado'});
    }

    jwt.verify(token, authConfig.SECRETJWT, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token inválido!'});
        req.userId = decoded.id
        return next()
    })
 }