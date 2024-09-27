document.addEventListener("DOMContentLoaded", function () {
    const employeeForm = document.getElementById('employee-form');
    const employeeBody = document.getElementById('employee-body');

    employeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Recoger los datos del formulario
        const employeeData = {
            first_name: document.getElementById('first-name').value,
            last_name: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone_number: document.getElementById('phone').value,
            hire_date: document.getElementById('hire-date').value,
            job_title: document.getElementById('job-title').value,
            salary: document.getElementById('salary').value,
        };

        const employeeId = document.getElementById('employee-id').value;

        try {
            if (employeeId) {
                // Actualizar empleado existente
                const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(employeeData)
                });
                if (!response.ok) throw new Error('Error updating employee');
            } else {
                // Crear nuevo empleado
                const response = await fetch('http://localhost:3000/employees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(employeeData)
                });
                if (!response.ok) throw new Error('Error creating employee');
            }

            employeeForm.reset();
            fetchEmployees();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        }
    });

    async function fetchEmployees() {
        try {
            const response = await fetch('http://localhost:3000/employees');
            if (!response.ok) throw new Error('Error fetching employees');
            const employees = await response.json();

            employeeBody.innerHTML = '';
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
                        <button class="btn btn-primary" onclick="editEmployee(${employee.employee_id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteEmployee(${employee.employee_id})">Delete</button>
                    </td>
                `;
                employeeBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        }
    }

    window.editEmployee = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/employees/${id}`);
            if (!response.ok) throw new Error('Error fetching employee');
            const employee = await response.json();

            document.getElementById('employee-id').value = employee.employee_id; // Asegúrate de que el ID sea correcto
            document.getElementById('first-name').value = employee.first_name;
            document.getElementById('last-name').value = employee.last_name;
            document.getElementById('email').value = employee.email;
            document.getElementById('phone').value = employee.phone_number;
            document.getElementById('hire-date').value = employee.hire_date;
            document.getElementById('job-title').value = employee.job_title;
            document.getElementById('salary').value = employee.salary;
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        }
    };

    window.deleteEmployee = async (id) => {
        if (confirm("Are you sure you want to delete this employee?")) {
            try {
                await fetch(`http://localhost:3000/employees/${id}`, {
                    method: 'DELETE'
                });
                fetchEmployees();
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred: ' + error.message);
            }
        }
    };

    fetchEmployees();
});
