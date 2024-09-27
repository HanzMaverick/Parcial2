const request = require('supertest');
const app = require('../index.js');
const db = require('../database/database');

describe('Employee CRUD API', () => {
    let employeeId;

    beforeAll(async () => {

        await db.query('DELETE FROM employees');
    });

    afterAll(async () => {

        await db.end();
    });

    it('should create a new employee', async () => {
        const employee = {
            first_name: 'Test',
            last_name: 'User',
            email: 'test@example.com',
            phone_number: '1234567890',
            hire_date: '2024-01-01',
            job_title: 'Developer',
            salary: 60000,
        };

        const res = await request(app).post('/employees').send(employee);
        employeeId = res.body.employee_id;

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('employee_id', employeeId);
    });

    it('should get all employees', async () => {
        const res = await request(app).get('/employees');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get an employee by ID', async () => {
        const res = await request(app).get(`/employees/${employeeId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('employee_id', employeeId);
        expect(res.body).toHaveProperty('first_name', 'Test');
    });

    it('should update an employee', async () => {
        const updatedEmployee = {
            job_title: 'Senior Developer',
            salary: 80000,
        };

        const res = await request(app).put(`/employees/${employeeId}`).send(updatedEmployee);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('job_title', 'Senior Developer');
        expect(res.body).toHaveProperty('salary', 80000);
    });

    it('should delete an employee', async () => {
        const res = await request(app).delete(`/employees/${employeeId}`);

        expect(res.statusCode).toEqual(200);

    
        const getRes = await request(app).get(`/employees/${employeeId}`);
        expect(getRes.statusCode).toEqual(404);
    });
});
