const yup = require('../yupConfig');

const attClient = yup.object().shape({
    name: yup.string().required()
});

module.exports = attClient;