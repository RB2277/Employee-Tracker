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
        }
        })
    }

    init()

    // function viewAllEmployees() {
    // const list = db.query('SELECT first_name, last_name FROM employee_db.employee;')
    // console.table

    // }
    