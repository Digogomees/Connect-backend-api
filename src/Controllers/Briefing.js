const connection = require("../database/connection")

module.exports = {
    async createBriefing(req,res) {
        const {title, responses} = req.body
        const parse = JSON.stringify(responses)

         try {

            await connection('briefing').insert({
                title: title,
                model_briefing: parse
            })

            return res.status(201).send({
                message: "Briefing criado com sucesso!!"
            })

         } catch (err) {
            console.log("Briefing *****", err)
            return res.status(500).json({
                message: "algo deu errado ao criar o briefing!"
            })
         }
    },

    async getBriefing(request, response){
        const briefings = await connection('briefing').select('*');

        //  transform modelBriefing in array 
         const newArrayBriefings = briefings.map(briefing => ({
            ...briefing,
            model_briefing: JSON.parse(briefing.model_briefing || null)
        }))

        return response.status(200).json(newArrayBriefings);
    },

    async updateBriefing(req,res) {
        const { title, responses } = req.body
        const parse = JSON.stringify(responses)
        const { id } = req.params

         try {

            await connection('briefing')
            .where("id", id)
            .first()
            .update({
                title: title,
                model_briefing: parse
            })

            return res.status(201).send({
                message: "Briefing atualizado!"
            })

         } catch (err) {
            console.log("Briefing Update *****", err)
            return res.status(500).json({
                message: "algo deu errado ao atualizar o briefing!"
            })
         }
    },
}