const Employee = require('../models/employee');

class EmployeeFactory {
    static createEmployee(data) {
        const { employee_id, first_name, last_name, email, phone_number, hire_date, job_title, salary } = data;
        return new Employee(employee_id, first_name, last_name, email, phone_number, hire_date, job_title, salary);
    }
}

module.exports = EmployeeFactory;
