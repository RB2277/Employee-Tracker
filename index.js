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

    //Function that queries a list of all employees
    function viewAllEmployees() {
        db.query('SELECT first_name, last_name FROM employee_db.employee;', (err, data) => {
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
        db.query('SELECT * FROM employee_db.department;', (err, data) => {
            if(err){
                console.log(err)
            } else {
                console.table(data)
            }
            init()
        }
        )}
    //Function to query and view all roles
    function viewAllRoles() {
        db.query('SELECT * FROM employee_db.role;', (err, data) => {
            if(err){
                console.log(err)
            } else {
                console.table(data)
            }
            init()
        }
        )}

    //Function to add a role. NOT YET WORKING
    function addRole() {
        db.query('SELECT * FROM employee_db.department;', (err, data) => {
            if(err){
                console.log(err)
            } else {
                console.table(data)
            }
            init()
        }
        )}

    //Function to query and view all departments
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