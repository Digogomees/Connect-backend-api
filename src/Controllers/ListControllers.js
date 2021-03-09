const connection = require('../database/connection')

module.exports = {

    async index(request, response){

        const {project_id} = request.params;

        const project = await connection('project')
            .where('project_id', project_id)
            .select('project.*')
            .first()

            const images = await connection('project')
            .where('project_id', project_id)
            .join('images', 'images.project_id', '=', 'project.id')
            .select('project.*', 'images.images_url')
            


            const serializedProject = project.map(proj => {
                return{
                    id: proj.id,
                    title: proj.title,
                    description: proj.description,
                    images:[
                        ...proj.images_url
                    ]
                }
            })

            return response.json(images)
        
    } 

}