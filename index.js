//Imports all of the requires packages
const inquirer = require('inquirer')
const fs = require('fs')
const db = require('./config/connect')

//Array that holds the main inquirer questions
const welcomeScreen = [
    {
        type: 'list',
        message: 'What would you like to do? (Use arrow keys)',
        choices: 
        ['View All Employees', 
        "Add Employee", 
        "Update Employee Role", 
        "View All Roles", 
        "Add Role", 
        "View All Departments", 
        "Add Department"],
        name: 'text'
    }
]   
    //Function that starts the inquirer prompt and switches reponses based off of user choice
    function init() {
        inquirer.prompt(welcomeScreen)
        .then((response) => {
        switch(response.text) {
            case 'View All Employees':
                viewAllEmployees()
                break;

            case 'Add Employee':
                addEmployee()
                break;

            case 'Update Employee Role':
                updateEmployeeRole()
                 break;

            case 'View All Roles':
                viewAllRoles()
                break;

            case 'Add Role':
                addRole()
                break;

            case 'View All Departments':
                viewAllDepartments()
                break;
            case 'Add Department':
                addDepartment()
                break;
        }
        })
    }
    //Calls the init function above as soon as the application starts
    init()

    //Function that lists all employees
    function viewAllEmployees() {
        db.query(`SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee 
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (err, data) => {
            if(err){
             console.log(err)
        }   else {
             console.table(data)
        }
            init()
    }
        )}


    //Function that adds an employee. NOT YET WORKING
    function addEmployee() {
        db.query('SELECT * FROM employee_db.department;', (err, data) => {
            if(err){
                console.log(err)
            } else {
                console.table(data)
            }
            init()
        }
        )}


    //Function to change the role of a specific employee. NOT YET WORKING
    function updateEmployeeRole() {
        db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`, (err, employees) =>{
            const employeeList = employees.map(employee => ({
            name: employee.name,
            value: employee.id
            }));
            db.query(`SELECT id, title FROM role`, (err, roles) =>{
            const roleList = roles.map(role => ({
            name: role.title,
            value: role.id
            }))
        inquirer.prompt([
            {
                type: 'list',
                message: "What employee's role do you want to update?",
                name: 'employee',
                choices: employeeList
            },
            {
                type: 'list',
                message: "Which role do you want to assign the selected employee?",
                name: 'role',
                choices: roleList
            }
        ]) .then((res) => {
            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [res.role, res.employee], (err, data) => {
                if(err){
                    console.log(err)
                } else {
                        console.log("Employee successfully updated!")
                        init()
                    }})
        })
    })
})}

    //Function to view all roles
    function viewAllRoles() {
        db.query('SELECT role.title, department.name, role.salary FROM role JOIN department ON role.department_id = department.id;', (err, data) => {
            if(err){
                console.log(err)
            } else {
                console.table(data)
            }
            init()
        }
        )}





    //Function to add a role
    function addRole() {
        db.query('SELECT * FROM department', (err, departments) =>{

        const departmentList = departments.map(department => ({
        name: department.name,
        value: department.id
        }));
        inquirer.prompt([
        {
            type: 'text',
            message: 'What is the name of the role?',
            name: 'role'
        },
        {   type: 'text',
            message: 'What is the salary of the role?',
            name: 'salary'
        },
        {   type: 'list',
            message: 'What department does the role belong to?',
            name: 'department',
            choices: departmentList
        }
    ]).then((res) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [res.role, res.salary, res.department], (err, data) => {
            if(err){
                console.log(err)
            } else {
                    console.log("Role successfully added!")
                    init()
                }})
        })
           })

    }
    

    //Function to view all departments
    function viewAllDepartments() {
        db.query('SELECT * FROM employee_db.department;', (err, data) => {
            if(err){
                console.log(err)
            } else {
                console.table(data)
            }
            init()
        }
        )}


    //Function to add a department
    function addDepartment() {
        inquirer.prompt({
            type: 'text',
            message: 'What is the name of the department you would like to add?',
            name: 'department'
        }) .then((res) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, [res.department], (err, data) => {
                if(err){
                    console.log(err)
                } else {
                    console.log("Department successfully added!")
                }
                init()
            }
            )
        })
    }