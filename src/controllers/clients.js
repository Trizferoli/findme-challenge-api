const knex = require('../connection');
const schemaAddClient = require('../validation/client/schemaAddClient');
const schemaAttClient = require('../validation/client/schemaAttClient');


const addClient = async (req, res) => {
    const { name } = req.body;

    try {
        await schemaAddClient.validate(req.body);

        const clientExists = await knex('clients').where('name', name).returning('name').first();

        if (clientExists) {
            return res.status(409).json({ "message": "Este cliente já está cadastrado." })
        }

        const client = await knex('clients').insert({ name });

        return res.status(201).json({ message: "Cliente cadastrado com sucesso." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}



const getClients = async (req, res) => {
    try {
        const clients = await knex('clients').select('*');

        return res.status(200).json(clients);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



const attClient = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        await schemaAttClient.validate(req.body);

        const user = await knex('clients').update({ name }).where('id', id);

        return res.status(204).json({ "message": "Cliente alterado com sucesso!" })

    } catch (error) {

        return res.status(400).json({ message: error.message });
    }
}



const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await knex('clients').del().where('id', id);

        return res.status(200).json({ "message": "Cliente deletado com sucesso!" })

    } catch (error) {

        return res.status(400).json({ message: error.message });
    }
}
module.exports = { addClient, getClients, attClient, deleteClient }
