const connection = require('../database/connection')

module.exports = {
    async index(request, response) {

        const projects = await connection('project')
            .select('project.*')


        const images = await connection('project')
            .join('images', 'images.project_id', 'project.id')
            .select('images.*')

        projects.find(project => {
            project['images'] = [];
        });

        images.map((image) => {
            projects.filter((project) => {
                if (project.id === image.project_id) {
                    project.images.push(image.images_url);
                }
            })
        });

        return response.json(projects);
    }
}


