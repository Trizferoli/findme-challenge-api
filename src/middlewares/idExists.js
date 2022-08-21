const knex = require('../connection');

const idExists = (table) => {
    return async (req, res, next) => {
        let { id } = req.params;
        if (!id) {
            id = req.employee.id
        }

        console.log(id)
        let message = ''
        const employee = await knex(table).where('id', id).first();

        if (table === 'service_order') {
            message = 'Esta ordem de serviço não está cadastrada.'
        }
        else if (table === 'employees') {
            message = 'Este contribuidor não está cadastrado.'
        }
        else if (table === 'clients') {
            message = 'Este cliente não está cadastrado.'
        }
        else { message = "Não foi possível completar sua requisição." }
        if (!employee) { return res.status(404).json({ message }) }
        next();
    }
}


module.exports = idExists

