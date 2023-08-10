const inquirer = require("inquirer");
// gets sql
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: "Robbies-MacBook-Pro.local",
  user: "root",
  database: "business_db",
  password: "robbie123"
});

function start(){
  inquirer
    .prompt([
      { type: "list",
        name: "select",
        message: "Please Select One to Continue:",
        choices: ["View All Departments", "View All Roles", 
        "View All Employees", "Add a Department", 
        "Add a Role", "Add an Employee" , "Update Employee"]
      },
    ])
    .then(function(response){
      if (response.select === "View All Departments"){
        viewDepartments() ;
      } else if (response.select === "View All Roles"){
        viewRoles();
      } else if (response.select === "View All Employees"){
        viewEmployees() ;
      } else if (response.select === "Add a Department"){
        addDepartment();
      } else if (response.select === "Add a Role"){
        addRole();
      } else if (response.select === "Add an Employee") {
        addEmployee() ;
      } else {
        updateEmployee();
    }});
};

function viewDepartments(){
  connection.query(
    'SELECT * FROM `department`',
    function(err, results) {
      err ? console.log(err) : console.table(results) ;
      start();
    }
  );
};

function viewRoles(){
  connection.query(
    'SELECT * FROM `roles`',
    function(err, results) {
      err ? console.log(err) : console.table(results) 
      start();
    }
  );
};

function viewEmployees(){
  connection.query(
    'SELECT * FROM `employee`',
    function(err, results) {
      err ? console.log(err) : console.table(results) ;
      employQuery() ;
    }
  );
};

function employQuery () {
  inquirer
    .prompt([
      { type: "list",
        name: "employee",
        message: "Please Select One to Continue:",
        choices: ["Add Employee", "Delete Employee", 
        "Go Back"]
      },
    ])
    .then(function(response){
      if (response.employee === "Add Employee"){
        addEmployee() ;
      } else if (response.employee === "Delete Employee"){
        deleteQuery();
      } else {
        start();
      }
    });
};

function addEmployee() {
  inquirer
    .prompt([
      { type: "input",
        name: "newFirst",
        message: "What is the Employees First Name?",
      },
      { type: "input",
        name: "newLast",
        message: "What is the Employees Last Name?",
      },
      { type: "list",
        name: "role",
        message: "What role will the Employee Fullfill?",
        choices: 
        ["Sales Associate - Grocery",
        "Sales Associate - Produce",
        "BOH"]
      },
      { type: "list",
        name: "manaId",
        message: "What is their corresponding managers ID?",
        choices: 
        ["2",
        "3",
        "6",
        "7"]
      },
    ])
    .then(function(response) {
      if (response.newFirst === "" || response.newLast === "") {
        console.log("Please Enter in both First and Last Name.");
        addEmployee();
      } else {
        let firstName = response.newFirst;
        let lastName = response.newLast ;
        let role = response.role;
        let managerId = response.manaId ;

        if (role === "Sales Associate - Grocery") {
        let roleNum = 1 ;
        connection.query(
          `INSERT INTO employee(firstName, lastName, role_id, manager_id) 
        VALUES ('${firstName}','${lastName}', ${roleNum}, ${managerId})`,
          function(err, results) {
            err ? console.log(err) : 
            console.log('\n')
            console.log(`Employee Added!`) ;
          }
        );
        start();
      } else if (role === "Sales Associate - Produce") {
        let roleNum = 2 ;
        connection.query(
          `INSERT INTO employee(firstName, lastName, role_id, manager_id) 
        VALUES ('${firstName}','${lastName}', ${roleNum}, ${managerId})`,
          function(err, results) {
            err ? console.log(err) : 
            console.log('\n')
            console.log(`Employee Added!`) ;
          }
        );
        start();
      } else {
        let roleNum = 3;
        connection.query(
          `INSERT INTO employee(firstName, lastName, role_id, manager_id) 
        VALUES ('${firstName}','${lastName}', ${roleNum}, ${managerId})`,
          function(err, results) {
            err ? console.log(err) : 
            console.log('\n')
            console.log(`Employee Added!`) ;
          }
        );
        start();
      }
  }})
};

function deleteQuery(){
  inquirer
    .prompt([
      { type: "input",
        name: "lastName",
        message: "What is the Employees Last Name?",
      }])
      .then(function(response){
        let lastName = response.lastName ;
        if (lastName === '') {
          console.log('Please enter the last name of employee.');
          deleteQuery();
        } else {
          connection.query(
            `DELETE FROM employee WHERE lastName ='${lastName}';`,
            function(err, results) {
            err ? console.log(err) : console.log('\n')
            console.log(`Employee Deleted!`) ;
            }
        );
        ;
        start();
        }
      })
}

function addDepartment() {
  inquirer
    .prompt([
      { type: "input",
        name: "department",
        message: "What is the new Department called?",
      }])
      .then(response => {
        let department = response.department;
        if ( department === ''){
          console.log('Please Enter a Department Name.')
          addDepartment()
        } else {
          connection.query(
            `INSERT INTO department(departName) 
          VALUES ('${department}')`,
            function(err, results) {
              err ? console.log(err) : 
              console.log('\n')
              console.log(`Department Added!`) ;
            }
          );
          start();
        }
      })
}

function addRole(){
  inquirer
    .prompt([
      { type: "input",
        name: "roleName",
        message: "What is the new Roles Name?",
      },
      { type: "input",
        name: "roleSalary",
        message: "What is the new Roles Salary?",
      },
      { type: "input",
        name: "department",
        message: "What is the new Roles Department Id?",
      }
    ])
    .then(response => {
      let roleName = response.roleName;
      let roleSalary = response.roleSalary ;
      let department = response.department;

      if (roleName === '' || roleSalary === '' || department === '') {
        console.log('Please enter role name, role salary, and department id to continue.')
        addRole() ;
      } else {
        connection.query(
          `INSERT INTO roles(title, salary, department_id) 
        VALUES ('${roleName}' ,'${roleSalary}',${department})`,
          function(err, results) {
            err ? console.log(err) : 
            console.log('\n')
            console.log(`Role Added!`) ;
          }
        );
        start();
      }
    })
};

function updateEmployee() {
  inquirer
    .prompt([
      { type: "input",
        name: "lastName",
        message: "What is the Employee's Last Name?",
      },
      { type: "input",
        name: "newRole",
        message: "What is the Employee's new Role Id?",
      }
    ])
    .then(response => {

      let lastName = response.lastName;
      let newRole = response.newRole ;

      if (lastName === '' || newRole === '') {
        console.log(`Please enter employee's last name, and their new role id.`)
        updateEmployee() ;

      } else {
        connection.query(
          `UPDATE employee SET role_id = ${newRole} WHERE lastName = '${lastName}'`,
          function(err, results) {
            err ? console.log(err) : 
            console.log('\n')
            console.log(`Role Changed for Employee ${lastName}!`) ;
          }
        );
        
        start();
      }
    });
};

start()