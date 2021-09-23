const connection = require("../database/connection")
const { index } = require("./ProjectControllers")

function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç";
    var to   = "aaaaeeeeiiiioooouuuunc";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') 
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    return str;
}


module.exports = {

    async create(request, response){

        const {title, description, thumbnail, images} = request.body
        var slug = string_to_slug(title)

       const id_projects = await connection('project').insert({
            title,
            slug,
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


        return response.status(201).send('Projeto Cadastrado com Sucesso!')
    }
   
}