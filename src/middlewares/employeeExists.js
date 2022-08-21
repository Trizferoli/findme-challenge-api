const knex = require('../connection');

const employeeExists = async (req, res, next) => {
    const { id_employee } = req.body;
    const employee = await knex('employees').where('id', id_employee).first();

    if (!employee) { return res.status(404).json({ "message": "Este colaborador não está cadastrado." }) }
    next();
}



module.exports = employeeExists;