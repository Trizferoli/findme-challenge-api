const yup = require('../yupConfig');

const addClient = yup.object().shape({
    name: yup.string().required()
});

module.exports = addClient;