const knex = require('../connection');

const clientExists = async (req, res, next) => {
    const { id_client } = req.body;
    const client = await knex('clients').where('id', id_client).first();

    if (!client) { return res.status(404).json({ "message": "Este cliente não está cadastrado." }) }
    next();
}



module.exports = clientExists;