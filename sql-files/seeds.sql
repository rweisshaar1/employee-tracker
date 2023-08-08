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

INSERT INTO employee (firstName, lastName, role_id, manager_id) -- not done yet, how to get manager id to line up with employee
VALUES 
  ("Jimmy", "James", 1 , False),
  ("Bob", "Robert", 4 , True ),
  ("Kyle", "Man" , 5 , True ),
  ("Tina", "Turner", 2 , False),
  ("Fred", "Flintstone" , 3 , False),
  ("Billy", "Madison", 6 , True),
  ("Martha", "Stewart" , 7 , True);