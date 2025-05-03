require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const { title } = require("process");
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const Task = require("./models/mongTask");
const mongoDBURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/ToDoList";

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("Connection Successful"))
  .catch(() => console.error("Connection Error:", err));

const taskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: String,
  isCompleted: Boolean,
});

// const Task = mongoose.model("Task", taskSchema);
Task.taskSchema

async function saveToDB(task) {
  try {
    await task.save();
    console.log("successfully saved data!");
  } catch (err) {
    console.error("Error Occurred:", err);
  }
}

async function fetchTasks() {
  return await Task.find();
}

async function fetchTaskById(id) {
  return await Task.findById(id);
}

async function deleteTask(id) {
  await Task.deleteOne({ _id: id });
}

async function updateTask(filter, update) {
  await Task.findOneAndUpdate(filter, update);
  let updatedTask = await fetchTaskById(filter);
}

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/script")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, () => {
  console.log("app listening on port", port);
});

app.get("/", (req, res) => {
  res.redirect("/tasks");
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    res.render("index.ejs", { tasks });
  } catch (e) {
    console.error("Error Occurred:", e);
  }
});

app.get("/tasks/new", (req, res) => {
  res.render("newtask.ejs");
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await fetchTaskById(id);
    res.render("detailtask.ejs", { task });
  } catch (e) {
    console.error("Error Occurred:", e);
  }
});

app.get("/tasks/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await fetchTaskById(id);
    res.render("edit.ejs", { task });
  } catch (e) {
    console.error("Error Occurred:", e);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description, isCompleted: false });
    await saveToDB(newTask);
    res.redirect("/tasks");
  } catch (e) {
    console.error("Error Occurred:", e);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await updateTask({ _id: id }, { title, description });
    res.redirect("/tasks");
  } catch (e) {
    console.error("Error Occurred:", e);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    res.redirect("/tasks");
  } catch (e) {
    console.error("Error Occurred:", e);
  }
});
