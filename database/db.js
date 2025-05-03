import { createConnection } from "mysql";

export const connection = createConnection({
  host: "localhost",
  user: "shreyas",
  password: "mahitnahi",
  database: "ToDoList",
});