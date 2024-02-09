//Imports all of the requires packages
const inquirer = require('inquirer')
const fs = require('fs')
const db = require('./config/connect')



//Displays when the app is first started
console.log(`

███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗      
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝      
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗    
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝    
                                                                         
███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗            
████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗           
██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝           
██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗           
██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║           
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝           
                                                                         
`)




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
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee 
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (err, data) => {
            if(err){
             console.log(err)
        }   else {
            console.log("Listing every employee")
            console.table(data)
        }
            init()
    }
        )}


    //Function that adds an employee
    function addEmployee() {
        db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`, (err, employees) =>{
            const employeeList = [{ name: 'None', value: null}].concat(employees.map(employee => ({
            name: employee.name,
            value: employee.id
            })));
            db.query(`SELECT id, title FROM role`, (err, roles) =>{
            const roleList = roles.map(role => ({
            name: role.title,
            value: role.id
            }))
        inquirer.prompt([
            {
                type: 'text',
                message: "What is the employee's first name?",
                name: 'fname',
            },
            {
                type: 'text',
                message: "What is the employee's last name?",
                name: 'lname',
            },
            {
                type: 'list',
                message: "What is the employee's role",
                name: 'role',
                choices: roleList
            },
            {
                type: 'list',
                message: "Who is the employee's manager",
                name: 'manager',
                choices: employeeList
            },
        ]).then((res) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [res.fname, res.lname, res.role, res.manager], (err, data) => {
                if(err){
                    console.log(err)
                } else {
                        console.log("Employee successfully added!")
                        init()
                    }})
        })
    })}
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
        db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id;', (err, data) => {
            if(err){
                console.log(err)
            } else {
                console.log("Listing every role")
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
                console.log("Listing every department")
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

    /*
    Ideas for future improvements
    
Application allows users to update employee managers
Application allows users to view employees by manager 
Application allows users to view employees by department
Application allows users to delete departments, roles, and employees 
Application allows users to view the total utilized budget of a department—in other words, the combined salaries of all employees in that department
    */