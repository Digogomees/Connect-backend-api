
const connection = require('../database/connection')
const path = require('path')
const fs = require('fs')
const util = require('util')

module.exports = {

   async index(request,response){

        const urls = await connection('images')
        
        .join('project', 'project.id', '=', 'images.project_id')
        .select(['images.*', 'project.title'])

        return response.json(urls);
    }, 

    async create(request, response){
        // const {images_url} = request.body;
        // const { filename } = request.file
        const {project_id} = request.body;

        console.log(request.files)

        // const [id] = await connection('images').insert({
        //     images_url: filename,
        //     project_id
        // })

        return response.status(201).send({})
    },

    async delete(request, response){
        const {id} = request.params;

        // busca a imagem pra comparar com a da pasta upload pelo images_url
        const findImage = await connection('images')
        .where('id', id)
        .select('images.*')
        .first()

        // remove a imagem da pasta upload
        util.promisify(fs.unlink)(path.resolve(__dirname, '../../tmp/uploads/', findImage.images_url))
        // remove a imagem no banco
        await connection('images').where('id', id).delete()

        return response.status(204).send({message: 'imagem removida!'})
    }
}