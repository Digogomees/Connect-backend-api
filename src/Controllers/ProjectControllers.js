const { update } = require('../database/connection');
const connection = require('../database/connection')

module.exports = {

    async index(request, response){
        const project = await connection('project').select('*');
        return response.json(project);
    },

    async delete(request, response){
        const {id} = request.params;

        await connection('project').where('id', id).delete()

        return response.status(204).send()
    },

    async update(request, response){
        const {id} = request.params;
        const {title, description} = request.body;

        await connection('project').where('id', id).update({
            title,
            description
        })

        return response.status(204).send('Atualizado com sucesso !!')
    },

}