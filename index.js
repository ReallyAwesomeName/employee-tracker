const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
      switch (answer.action) {
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
    return main();
  });
}

function viewRoles() {
  // view all roles
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    main();
  });
}

function viewEmployees() {
  // view all employees
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    main();
  });
}

function addDepartment() {
  // add a department
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
          main();
        }
      );
    });
}

function addRole() {
  // add a role
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role you would like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role you would like to add?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department ID of the role you would like to add?",
      },
    ])

    .then(function (answer) {
      db.query(
        "INSERT INTO role SET?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          main();
        }
      );
    });
}

function addEmployee() {
  // add an employee
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message:
          "What is the first name of the employee you would like to add?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee you would like to add?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID of the employee you would like to add?",
      },
      {
        type: "input",
        name: "manager_id",
        message:
          "What is the manager ID of the employee you would like to add?",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          answer.first_name,
          answer.last_name,
          answer.role_id,
          answer.manager_id,
        ],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          main();
        }
      );
    });
}

function updateEmployeeRole() {
  // update an employee role
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message:
          "What is the employee ID of the employee you would like to update?",
      },
      {
        type: "input",
        name: "role_id",
        message:
          "What is the role ID of the employee you would like to update?",
      },
    ])
    .then(function (answer) {
      db.query(
        "UPDATE employee SET role_id =? WHERE id =?",
        [answer.role_id, answer.employee_id],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          main();
        }
      );
    });
}

main();
