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
VALUES ('Frederick', 'Frankenstein', 1, NULL),
       ('Truman', 'Burbank', 2, 1),
       ('Don', 'Quixote', 3, NULL),
       ('Verzik', 'Vitur', 4, 3),
       ('Edward', 'Teach', 5, NULL),
       ('Nikita', 'Buyanov', 6, 5),
       ('Pat', 'Mcafee', 7, NULL),
       ('Claude', 'Monet', 8, 7);

       

