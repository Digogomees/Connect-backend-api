const connection = require("../database/connection")
const crypto = require('crypto')

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
        try {

            const {title, description, about_project, tags} = request.body
            const imageFiles = request.files
    
            // o -1 é pra ser exatamento o valor do indice 
            const thumbnail = ""
            var slug = string_to_slug(title)
            const array = JSON.stringify(about_project)
            const hashId = crypto.randomBytes(4).toString('hex')

            await connection('project').insert({
                id: hashId,
                title,
                slug,
                description,
                about_project: array,
                tags,
                thumbnail
            })
    
            const project_id = hashId
    
            const imagensArray = imageFiles.map(images_item => {
                return{
                    images_url: images_item.filename,
                    project_id
                };
            })
    
            await connection('images').insert(imagensArray)
            return response.status(201).send('Projeto Cadastrado com Sucesso!')
        } catch (err) {
            console.log('Create project error ***', err)
            return response.status(400).send({
                error: "Algo deu errado! Projeto não foi cadastrado"
            })
        }
    }
   
}