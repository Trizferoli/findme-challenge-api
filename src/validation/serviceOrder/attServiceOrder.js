const yup = require('../yupConfig');

const schemaAddServiceOrder = yup.object().shape({
    date: yup.date().required(),
    id_client: yup.number().required(),
    id_employee: yup.number().required()
});

module.exports = schemaAddServiceOrder;