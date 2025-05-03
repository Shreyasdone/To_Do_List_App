import { connection as con } from "../database/db.js";

export const addTask = async (title, description, user_id) => {
  return new Promise((resolve, reject)=>{
    let query = `INSERT INTO tasks (title, description) values (?,?)`;
    let userTasksQuery = `INSERT INTO user_tasks (user_id, task_id) values (?,?)`;
    con.query(query, [title, description], (err, result) => {
      if (err) {
        console.error("Error adding task:",err);
        return reject(err);
      }
      con.query(userTasksQuery, [user_id,result.insertId], (err, result)=>{
        if (err) {
          console.error("Error adding user_task",err);
          return reject(err);
        }
        resolve(result);
      })
    });
  })
};

// deprecated
export const fetchAllTasks = () => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM tasks WHERE isCompleted = 0`, (err, result) => {
      if (err) {
        console.error("Error Occurred:", err);
        return reject(err);
      }
      console.log("Tasks Fetched Successfully");
      resolve(result);
    });
  });
};


export const fetchTaskById = (id) => {
  return new Promise((resolve,reject) => {
    let query = "SELECT * FROM tasks WHERE _id = ?";
    con.query(query, [id], (err, result)=>{
      if(err) {
        console.error("Error fetching task:",err);
        return reject(err);
      }
      resolve(result[0]);
    })
  })
}

export const fetchTaskByTitle = (title) => {
  return new Promise((resolve,reject) => {
    let query = "SELECT * FROM tasks WHERE title = ?";
    con.query(query, [title], (err, result)=>{
      if(err) {
        console.error("Error fetching task:",err);
        return reject(err);
      }
      resolve(result[0]);
    })
  })
}
export const  deleteTaskById = async (id) => {
  try {
    await new Promise((resolve,reject)=>{
      let query = "DELETE FROM tasks WHERE _id = ?";
      con.query(query, [id], (err,result)=>{
        if(err) {
          console.error("Error deleting the task:",err);
          reject(err);
        }
        console.log("task deleted successfully");
        resolve(result);
      });
    })
    let rowCount = await getRowCount();
    console.log(rowCount);
    if(rowCount == 0) {
      await resetAutoInc(rowCount);
    }
  } catch (e) {
    console.error("Error Occurred While Deleting:",e);
  }
}

export const updateTaskById = (id,title,description) => {
    let query = "UPDATE tasks SET title=?, description=? where _id = ?";
    con.query(query, [title,description,id], (err,result) => {
      if(err) console.error("Error updating task:",err);
      console.log("task updated successfully");
    });
}

const getRowCount = async () => {
  return await new Promise((resolve,reject)=>{
    con.query("SELECT COUNT(*) AS count FROM tasks", (err,result)=>{
      if(err) {
        console.error("Error while Counting rows:",err);
        reject(err);
      }
      resolve(result[0].count);
    });
  })
}

const resetAutoInc = async (rowCount) => {
  if (rowCount === 0) {
    await new Promise((resolve, reject) => {
      con.query("ALTER TABLE tasks AUTO_INCREMENT = 1", (err) => {
        if (err) return reject(err);
        console.log("AUTO_INCREMENT reset to 1 because table is empty.");
        resolve();
      });
    });
  }
}

export const fetchUserTasks = (id)=> {
  return new Promise((resolve,reject)=>{
      let query = "SELECT t.* FROM tasks t JOIN user_tasks ut ON ut.task_id = t._id WHERE user_id = ?";
      con.query(query, [id],(err,result)=>{
          if(err) {
              console.log("Error occured while fetching user tasks:",err);
              return reject(err);
          }
          resolve(result);
      });
  });
};