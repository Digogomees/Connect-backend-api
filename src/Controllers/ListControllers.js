const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const { project_id } = request.params;

        const project = await connection('project')
            .where('id', project_id)
            .select('project.*')
            .first()

        const images = await connection('project')
            .where('project_id', project_id)
            .join('images', 'images.project_id', '=', 'project.id')
            .select('images.images_url');
        
        const serializedImages = images.map((image) => image.images_url);

       

        const result = {
            project,
            images: serializedImages
        }
        
        return response.json(result);  
    },
    
    
}