const knex = require('../connection');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization) { return res.status(404).json({ "mensagem": "Token não foi informado." }) };

    const token = authorization.replace('Bearer', '').trim();

    try {
        const { id } = jwt.verify(token, jwtSecret);

        const user = await knex('employees').where('id', id).returning('*').first();

        if (!user) { return res.status(401).json({ "mensagem": "Não foi possível acessar usuário." }) };

        const { password, ...employee } = user;
        req.employee = employee;
        next();
    } catch (error) {

        return res.status(401).json({ "mensagem": error.message });
    }
};


module.exports = { verifyToken };