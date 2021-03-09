
const connection = require('../database/connection')

module.exports = {

   async index(request,response){

        
        
        const urls = await connection('images')
        // .join('project', 'project.id', '=', 'images.project_id')
        // .select('images.*', 'project.title', 'project.description')
        .join('project', 'project.id', '=', 'images.project_id')
        .select(['images.*',])

        // const serializedUrls = urls.filter(url => {
        //     return {
        //       id: url.id,
        //       img1: url?.img1,
        //       img2: url?.img2,
        //       img3: url?.img3,
        //       img4: url?.img4,
        //       img5: url?.img5,
        //       img6: url?.img6,
        //       img7: url?.img7,
        //       img8: url?.img8,
        //     };
        //   })

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