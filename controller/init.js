import { connection as con } from "../database/db.js";

const createDB = (dbName) => {
    let createDBquery = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
    con.query(createDBquery, (err, result) => {
      if (err) console.error("Error creating DB",err);
      console.log(`${dbName} Database created Successfully`);
    });
};

const createTasksTable = () => {
    let query =
      "CREATE TABLE IF NOT EXISTS tasks (_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(100) NOT NULL, description VARCHAR(255), isCompleted BOOLEAN DEFAULT 0)";
    con.query(query, (err, result) => {
      if (err) console.error("error creating table:",err);
      console.log("Table Created Successfully!!");
    });
};

const createUserTable = () => {
  let query =
  "CREATE TABLE IF NOT EXISTS user (_id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100), email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL)";
  con.query(query, (err, result) => {
    if (err) console.error("error creating table:",err);
    console.log("Table Created Successfully!!");
  });
};

const createUserTaskTable = () => {
  let query = `CREATE TABLE IF NOT EXISTS user_tasks (
  user_id INT, task_id INT, PRIMARY KEY (user_id,task_id), FOREIGN KEY (user_id) REFERENCES user(_id) ON DELETE CASCADE, FOREIGN KEY (task_id) REFERENCES tasks(_id) ON DELETE CASCADE, INDEX idx_task_id (task_id))`;
  con.query(query,(err,result)=>{
    if(err) console.log("error occurred while creating user_tasks table:",err);
    console.log("Table Created Successfully!!");
  })
}

export const setupDB = () => {
  createDB("ToDoList");
  con.query("USE ToDoList", (err,result)=>{
    if(err) console.error("error while DB Setup:",err);
    createTasksTable();
    createUserTable();
    createUserTaskTable();
  });
};