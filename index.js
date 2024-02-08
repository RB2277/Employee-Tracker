const inquirer = require('inquirer')
const fs = require('fs')
const db = require('./config/connect')


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

    function init() {
        inquirer.prompt(welcomeScreen)
        .then((response) => {
        switch(response.text) {
            case 'View All Employees':
                viewAllEmployees()
                break;
            case 'View All Departments':
                viewAllDepartments()
                break;
        }
        })
    }

    init()

    function viewAllEmployees() {
    db.query('SELECT first_name, last_name FROM employee_db.employee;', (err, data) => {
        if(err){
            console.log(err)
        } else {
            console.table(data)
        }
    }
    )}

    function viewAllDepartments() {
        db.query('SELECT * FROM employee_db.department;', (err, data) => {
            if(err){
                console.log(err)
            } else {
                console.table(data)
            }
        }
        )
    }