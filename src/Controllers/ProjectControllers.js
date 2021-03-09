const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {

    async index(request, response){


        const project = await connection('project').select('*');
    
        return response.json(project);
    },


    async create(request, response){
        const {title, description } = request.body;

            await connection('project').insert({
            title, 
            description,
    })

    return response.status(204).send()
    },

    async delete(request, response){
        const {id} = request.params;

        await connection('project').where('id', id).delete()

        return response.status(204).send()
    }
}