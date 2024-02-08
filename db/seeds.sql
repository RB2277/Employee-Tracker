INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');


INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 99999, 1),
       ('Software Engineer', 75000, 1),
       ('Account Manager', 85000, 2),
       ('Accountant', 60000, 2),
       ('Legal Team Lead', 110000, 3),
       ('Lawyer', 100000, 3),
       ('Sales Lead', 90000, 4),
       ('Salesperson', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joe', 'Franklin', 1, NULL),
       ('Jonathan', 'Jacobs', 2, 1),
       ('Michael', 'Chandler', 3, NULL),
       ('Ashley', 'Stafford', 4, 3),
       ('Daniel', 'Mclaughlin', 5, NULL),
       ('Philip', 'Green', 6, 5),
       ('Andrea', 'Maple', 7, NULL),
       ('Brandon', 'Kai', 8, 7);

       

