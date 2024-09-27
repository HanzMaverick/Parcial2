const pool = require('../database/database');

// Obtener todos los empleados
exports.getAllEmployees = async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM employees');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
};

// Obtener un empleado por ID
exports.getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows, fields] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching employee' });
    }
};

// Crear un nuevo empleado
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, phone_number, hire_date, job_title, salary } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_title, salary) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, phone_number, hire_date, job_title, salary]);
        res.status(201).json({ employee_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating employee' });
    }
};

// Actualizar un empleado existente
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, hire_date, job_title, salary } = req.body;
    try {
        const [result] = await pool.query('UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone_number = ?, hire_date = ?, job_title = ?, salary = ? WHERE employee_id = ?',
            [first_name, last_name, email, phone_number, hire_date, job_title, salary, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating employee' });
    }
};

// Eliminar un empleado
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM employees WHERE employee_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting employee' });
    }
};
