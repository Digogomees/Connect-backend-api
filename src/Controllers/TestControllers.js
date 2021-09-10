const connection = require("../database/connection")
const { index } = require("./ProjectControllers")


module.exports = {

    async create(request, response){

        const {title, description, thumbnail, images} = request.body

       const id_projects = await connection('project').insert({
            title,
            description,
            thumbnail,
        })

        const project_id = id_projects[0]

        const imagensArray = images.map(images_item => {
            return{
                images_url: images_item.images_url,
                project_id
            };
        })

        await connection('images').insert(imagensArray)


        return response.status(201).send()
    }
   
}