INSERT INTO department (name)
VALUES ('dep1'),
    ('dep2'),
    ('dep3');
INSERT INTO role (title, salary, department_id)
VALUES ('role1', 1000, 1),
    ('role2', 2000, 2),
    ('role3', 3000, 3);
INSERT INTO employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ('emp1fn', 'emp1ln', 1, NULL),
    ('emp2fn', 'emp2ln', 2, 1),
    ('emp3fn', 'emp3ln', 3, 2);
('emp4fn', 'emp4ln', 4, 2);