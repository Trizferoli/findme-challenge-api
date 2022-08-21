const yup = require('../yupConfig');

const addEmployee = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
});

module.exports = addEmployee;