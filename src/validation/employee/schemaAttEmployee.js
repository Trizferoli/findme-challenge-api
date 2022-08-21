const yup = require('../yupConfig');

const attEmployee = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
});

module.exports = attEmployee;