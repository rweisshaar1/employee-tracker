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
    }});
};

function viewDepartments(){
  connection.query(
    'SELECT * FROM `department`',
    function(err, results, fields) {
      err ? console.log(err) : console.table(results) ;
      start();
    }
  );
};

function viewRoles(){
  connection.query(
    'SELECT * FROM `roles`',
    function(err, results, fields) {
      err ? console.log(err) : console.table(results) 
      start();
    }
  );
};

function viewEmployees(){
  connection.query(
    'SELECT * FROM `employee`',
    function(err, results, fields) {
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
    ])
    .then(function(response) {
      if (response.newFirst === "" || response.newLast === "") {
        console.log("Please Enter in both First and Last Name.");
        addEmployee();
      } else {
        let firstName = response.newFirst;
        let lastName = response.newLast ;
        let role = response.role

        if (role === "Sales Associate - Grocery") {
        let roleNum = 1 ;
        `INSERT INTO employee(firstName, lastName, role_id), 
        VALUES (${firstName},${lastName}, ${roleNum})`;
        console.log("Employee Added!")
        start();
      } else if (role === "Sales Associate - Produce") {
        let roleNum = 2 ;
        `INSERT INTO employee(firstName, lastName, role_id), 
        VALUES (${firstName},${lastName}, ${roleNum})`;
        console.log("Employee Added!")
        start();
      } else {
        let roleNum = 3;
        `INSERT INTO employee(firstName, lastName, role_id), 
        VALUES (${firstName},${lastName}, ${roleNum})`;
        console.log("Employee Added!")
        start();
      }
}})
}


start()