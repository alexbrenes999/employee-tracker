//setting dependencies 
const inquirer = require('inquirer');22222
const mysql = require('mysql2');
const tableFormat = require('console.table');

//creating database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tyra6310@',
  database: 'employees_db'
});
// connecting the database
db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the employees_db database.`)
  console.log(`Select an option from below to get started`);

  homeScreen();
});


//Start menu displayed when the program start
const homeScreen = async () => {
  const result = await inquirer
    .prompt({
      type: 'list',
      name: 'homeScreenSelection',
      message: 'Welcome! Choose your action below.',
      choices: [
        "View your departments",
        "View your roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee's role",
        "Quit"
      ]
    })
    // 
    .then((result) => {
      switch (result.homeScreenSelection) {
        case 'View all Departments':
          viewDepartments();
          break;

        case 'View all Roles':
          viewRoles();
          break;

        case 'View all Employees':
          viewEmployees();
          break;

        case 'Add a Department':
          addDepartment();
          break;

        case 'Add a Role':
          addRole();
          break;

        case 'Add an Employee':
          addEmployee();
          break;

        case "Update an Employee's role":
          updateEmployee();
          break;

        case 'Exit':
          quit();
          break;

        default:
          quit();
      }
    })
}


// function allows
const viewDepartments = () => {
  const sql = 'SELECT * FROM department';
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    homeScreen();
  })
}

const viewRoles = () => {
  const sql = 'SELECT * FROM role';
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    homeScreen();
  })
}

const viewEmployees = () => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    homeScreen();
  })
}

const addDepartment = async () => {
  const result = await inquirer
    .prompt({
      type: 'input',
      name: 'depName',
      message: 'What department would you like to add?'
    })
    .then((result) => {
      db.query('INSERT INTO department (name) Values (?)', [result.depName], (err, res) => {
        if (err) throw err;
        console.table(res);
        homeScreen();
      });
    });

  homeScreen();
}

const addRole = async () => {
  const result = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role? (Please enter numbers only)'
      },
      {
        type: 'input',
        name: 'department',
        message: 'What department is the new role in? Enter only the number for the "id" of the department.'
      }
    ])
    .then((result) => {
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [result.title, result.salary, result.department], (err, res) => {
        if (err) throw err;
        console.table(res);
      });
    });
  homeScreen();
}

const addEmployee = async () => {
  const result = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the first name of the new employee?'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the last name of the new employee?'
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Please enter the number of the employees role',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Who is the manager for the new employee? Enter the number of the "id" for the manager'
      }
    ])
    .then((result) => {
      db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [result.first_name, result.last_name, result.role_id, result.mnager_id], (err, res) => {
        if (err) throw err;
        console.table(res);
      });
    })
  homeScreen();
}

const updateEmployee = async (employeeId) => {
  const result = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: 'Which employee would you like to update? Please enter the employee id number'
      },
      {
        tpye: 'input',
        name: 'role_id',
        message: 'What new role would you like for your employee? Enter the number of the "id" of the desired new role'
      }
    ])
    .then((result) => {
      db.query('UPDATE employee SET role_id = ? WHERE id = ?', [result.role_id, result.employee_id], (err, res) => {
        console.table(res);
      });
    })
  homeScreen();
}

const quit = () => {
  db.end();
  process.exit();
}