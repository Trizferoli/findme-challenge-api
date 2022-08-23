const knex = require('../connection');
const schemaAddServiceOrder = require('../validation/ServiceOrder/addServiceOrder');
const schemaAttServiceOrder = require('../validation/ServiceOrder/attServiceOrder');


const addServiceOrder = async (req, res) => {
    const { date, id_client, id_employee } = req.body;

    try {
        await schemaAddServiceOrder.validate(req.body);

        const serviceOrder = await knex('service_order').insert({ date, id_client, id_employee }).returning('*');

        return res.status(201).json({ message: "Ordem de serviço cadastrada com sucesso." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}



const getServiceOrders = async (req, res) => {
    try {
        const serviceOrders = await knex('service_order').select('*');

        return res.status(200).json(serviceOrders);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



const attServiceOrder = async (req, res) => {
    const { date, id_client, id_employee } = req.body;
    const { id } = req.params;

    try {
        await schemaAttServiceOrder.validate(req.body);

        const user = await knex('service_order').update({ date, id_client, id_employee }).where('id', id);

        return res.status(204).json({ "message": "Ordem de serviço alterada com sucesso!" })

    } catch (error) {

        return res.status(400).json({ message: error.message });
    }
}



const deleteServiceOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await knex('service_order').del().where('id', id);

        return res.status(200).json({ "message": "Ordem de serviço deletada com sucesso!" })

    } catch (error) {

        return res.status(400).json({ message: error.message });
    }
}
module.exports = { addServiceOrder, getServiceOrders, attServiceOrder, deleteServiceOrder }

