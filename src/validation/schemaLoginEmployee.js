const yup = require('./yupConfig');

const loginEmployee = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
});

module.exports = loginEmployee;