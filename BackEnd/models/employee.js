class Employee {
    constructor(employee_id, first_name, last_name, email, phone_number, hire_date, job_title, salary) {
        this.employee_id = employee_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone_number = phone_number;
        this.hire_date = hire_date;
        this.job_title = job_title;
        this.salary = salary;
    }
}

module.exports = Employee;
