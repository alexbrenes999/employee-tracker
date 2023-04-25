-- All the departments
INSERT INTO department (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

-- All of the roles and their respective salaries as well as their corresponding departments
INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Lead', 100000, 1),
        ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 2),
        ('Software Engineer', 120000, 2),
        ('Account Manager', 160000, 3),
        ('Accountant', 125000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

-- All of the employees and their roles as well as their manager
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Alex', 'Brehknees', 1, NULL),
        ('Charles', 'West', 2, 1),
        ('Kelly', 'Persons', 3, NULL),
        ('Kayla', 'Pimentel', 4, 3),
        ('Rob', 'Banker', 5, NULL),
        ('Oswaldo', 'Osborn', 6, 5),
        ('Peyton', 'Savouge', 7, NULL),
        ('Hank', 'White', 8, 7);