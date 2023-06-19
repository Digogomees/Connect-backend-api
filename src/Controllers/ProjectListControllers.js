const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const { slug } = request.params;

        const project = await connection('project')
            .where('slug', slug)
            .select('project.*')
            .first()

        const images = await connection('project')
           .where('slug', slug)
            .join('images', 'images.project_id','project.id')
            .select('images.images_url');
        
        const serializedImages = images.map((image) => image.images_url);

        const result = {
            ...project,
            images: serializedImages
        }
        
        return response.json(result);  
    },
    
    
}