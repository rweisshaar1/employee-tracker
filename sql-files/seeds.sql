INSERT INTO department (departName)
VALUES
  ("Grocery"),
  ("Produce");

INSERT INTO roles (title, department_id, salary)
VALUES
  ("Sales Associate - Grocery", 1 ,20000),
  ("Sales Associate - Produce", 2 ,22000),
  ("BOH", 1 , 25000),
  ("Assistant Manager - Grocery", 1 , 30000),
  ("Assistant Manager - Produce", 2 , 33000),
  ("General Manager", 1,  45000),
  ("CEO", 1, 10000000);

INSERT INTO employee (firstName, lastName, role_id, manager_id)
VALUES 
  ("Jimmy", "James", 1, 2 ),
  ("Bob", "Robert", 4 , null ),
  ("Kyle", "Man" , 5 , null ),
  ("Tina", "Turner", 2, 3 ),
  ("Fred", "Flintstone" , 3 , 6),
  ("Billy", "Madison", 6 , null),
  ("Martha", "Stewart" , 7 , 7);