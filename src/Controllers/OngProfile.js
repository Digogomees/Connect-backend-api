
const connection = require('../database/connection')

module.exports = {

    async index(request, response){

        const {id} = request.params;
        const ongs = await connection('ongs').where('id', id).select('name','email','city','uf')

        return response.json(ongs)
    }

}