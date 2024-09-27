document.addEventListener('DOMContentLoaded', () => {
    const employeeTable = document.getElementById('employee-table');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const updateEmployeeBtn = document.getElementById('update-employee-btn');
    const deleteEmployeeBtn = document.getElementById('delete-employee-btn');


    const fetchEmployees = async () => {
        try {
            const response = await fetch('/employees');
            const employees = await response.json();
            employeeTable.innerHTML = '';
            employees.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.employee_id}</td>
                    <td>${employee.first_name}</td>
                    <td>${employee.last_name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.phone_number}</td>
                    <td>${employee.hire_date}</td>
                    <td>${employee.job_title}</td>
                    <td>${employee.salary}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="editEmployee(${employee.employee_id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${employee.employee_id})">Delete</button>
                    </td>
                `;
                employeeTable.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };


    const addEmployee = async () => {
        const employee = getEmployeeFormData();
        try {
            const response = await fetch('/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });
            await fetchEmployees();
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };


    const updateEmployee = async () => {
        const employee = getEmployeeFormData();
        const id = document.getElementById('employee-id').value;
        try {
            const response = await fetch(`/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });
            await fetchEmployees();
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };


    const deleteEmployee = async (id) => {
        try {
            await fetch(`/employees/${id}`, {
                method: 'DELETE'
            });
            await fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };


    window.editEmployee = (id) => {
        fetch(`/employees/${id}`)
            .then(response => response.json())
            .then(employee => {
                document.getElementById('employee-id').value = employee.employee_id;
                document.getElementById('first-name').value = employee.first_name;
                document.getElementById('last-name').value = employee.last_name;
                document.getElementById('email').value = employee.email;
                document.getElementById('phone-number').value = employee.phone_number;
                document.getElementById('hire-date').value = employee.hire_date;
                document.getElementById('job-title').value = employee.job_title;
                document.getElementById('salary').value = employee.salary;
            })
            .catch(error => console.error('Error editing employee:', error));
    };


    const getEmployeeFormData = () => {
        return {
            first_name: document.getElementById('first-name').value,
            last_name: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone_number: document.getElementById('phone-number').value,
            hire_date: document.getElementById('hire-date').value,
            job_title: document.getElementById('job-title').value,
            salary: document.getElementById('salary').value
        };
    };


    addEmployeeBtn.addEventListener('click', addEmployee);
    updateEmployeeBtn.addEventListener('click', updateEmployee);
    deleteEmployeeBtn.addEventListener('click', () => {
        const id = document.getElementById('employee-id').value;
        deleteEmployee(id);
    });

   
    fetchEmployees();
});
