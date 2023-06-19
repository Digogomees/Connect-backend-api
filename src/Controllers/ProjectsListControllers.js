const connection = require('../database/connection')

module.exports = {
    async index(request, response) {

        const projects = await connection('project')
            .select('project.*')


        const images = await connection('project')
            .select('project.*')
            .join('images', 'images.project_id', 'project.id')
            .select('images.*')

        // inclui paramentro imagens dentro do projetcs
        projects.find(project => {
            project['images'] = [];
        });


        // faz o push das imagens no parametro
        images.map((image) => {
            projects.filter((project) => {
                if (project.id === image.project_id) {
                    project.images.push(image.images_url);
                }
            })
        });

        // transform aboutProject in array 
        // projects.map(project => ({
        //     ...project,
        //     about_project: JSON.parse(project.about_project || null)
        // }))
        
        return response.json(projects);
    }
}


