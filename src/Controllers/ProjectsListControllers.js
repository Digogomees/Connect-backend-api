const connection = require('../database/connection')

module.exports = {
    async index(request, response){

        const project = await connection('project')
            .join('images', 'project.id', '=', 'images.project_id')
            .select('project.*', 'images.images_url')
            

        // const images = await connection('images')
            // .join('images', 'images.project_id', '=', 'project.id')
            // .select('images.images_url');
        
        // const serializedImages = images.map((image) => image.images_url);

       

        const result = {
            project
        }
        
        return response.json(result);  
    } 
}