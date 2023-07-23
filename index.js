const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "<PASSWORD>",
  database: "employees_db",
});

function main() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          process.exit(0);
        default:
          break;
      }
    });
}

function viewDepartments() {
  // view all departments
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function viewRoles() {
  // view all roles
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function viewEmployees() {
  // view all employees
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function addDepartment() {
  // view all departments
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO department SET?",
        {
          name: answer.name,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
    });
}
