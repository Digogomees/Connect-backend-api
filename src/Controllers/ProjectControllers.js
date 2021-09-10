const connection = require('../database/connection')

module.exports = {

    async index(request, response){


        const project = await connection('project').select('*');
    
        return response.json(project);
    },


    async create(request, response){
        
        const {title, description,thumbnail } = request.body;

            await connection('project').insert({
            title, 
            description,
            thumbnail
    })

    return response.status(204).send()
    },

    async delete(request, response){
        const {id} = request.params;

        await connection('project').where('id', id).delete()

        return response.status(204).send()
    }
}