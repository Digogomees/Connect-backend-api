
const connection = require('../database/connection')

module.exports = {

   async index(request,response){

        
        
        const urls = await connection('images')
        
        .join('project', 'project.id', '=', 'images.project_id')
        .select(['images.*', 'project.title'])


        return response.json(urls);

    }, 


    async create(request, response){
        const {images_url} = request.body;
        const {project_id} = request.body;

        

        const [id] = await connection('images').insert({
            images_url,
            project_id
        })

        return response.json({id})
    },

    async delete(request, response){
        const {id} = request.params;

        await connection('images').where('id', id).delete()

        return response.status(204).send()
    }
}