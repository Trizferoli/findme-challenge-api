const jwt = require('jsonwebtoken');
const securePassword = require('secure-password');
const pwd = securePassword();
const schemaAddEmployee = require("../validation/employee/schemaAddEmployee.js");
const schemaAttEmployee = require("../validation/employee/schemaAttEmployee");
const schemaLoginEmployee = require("../validation/employee/schemaLoginEmployee");
const knex = require('../connection');

const jwtSecret = process.env.JWT_SECRET;

const addEmployee = async (req, res) => {
    const { name, email, password } = req.body;
    let hash = '';

    try {
        await schemaAddEmployee.validate(req.body);

        const employeeExists = await knex('employees').where('email', email).returning('name').first();

        if (employeeExists) {
            return res.status(409).json({ "message": "Este e-mail já está cadastrado." })
        }

        hash = (await pwd.hash(Buffer.from(password))).toString('hex');


        const employee = await knex('employees').insert({ name, email, password: hash });

        return res.status(201).json({ message: "contribuidor cadastrado com sucesso." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}



const loginEmployee = async (req, res) => {
    const { email, password } = req.body;
    try {
        await schemaLoginEmployee.validate(req.body);

        const employee = await knex('employees').where('email', email).first();

        if (!employee) { return res.status(404).json({ "mensagem": "Não foi possível completar o login." }) };
        const { id, name } = employee;


        const result = await pwd.verify(Buffer.from(password), Buffer.from(employee.password, "hex"));
        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json("E-mail ou senha incorretos.");
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
                    await knex('employees').update({ email, 'password': hash });
                } catch {
                }
                break;
        }

        const token = jwt.sign({ id }, jwtSecret, { expiresIn: '2h' });
        return res.status(200).json({ 'usuario': { id, name, email }, token });
    } catch (error) {
        return res.status(400).json({ message: error.message });

    }
}



const getEmployees = async (req, res) => {
    try {
        const employees = await knex('employees').select('id', 'name', 'email').returning('*');
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



const attEmployee = async (req, res) => {
    const { id } = req.employee;
    const { name } = req.body;

    try {
        await schemaAttEmployee.validate(req.body);

        const employee = await knex('employees').update({ name }).where('id', id);

        return res.status(204).json({ "message": "Cliente alterado com sucesso!" })

    } catch (error) {

        return res.status(400).json({ message: error.message });
    }
}



const deleteEmployee = async (req, res) => {
    const { id } = req.employee;
    try {
        const employee = await knex('employees').del().where('id', id);

        return res.status(200).json({ "message": "Cliente deletado com sucesso!" });

    } catch (error) {

        return res.status(400).json({ message: error.message });
    }
}

module.exports = { addEmployee, loginEmployee, getEmployees, attEmployee, deleteEmployee }
