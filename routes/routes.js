import express from "express";
import { addTask, deleteTaskById, fetchUserTasks, fetchAllTasks, fetchTaskById, updateTaskById } from "../controller/task-controller.js";
import { authorization } from "../middleware/authMiddleware.js";
import { getUserById } from "../controller/user-controller.js";
export const router = express.Router();

router.get("/tasks", authorization, async (req, res) => {
  try {
    const tasks = await fetchUserTasks(req.user.user_Id);
    const user = await getUserById(req.user.user_Id);
    // console.log(user.first_name);
    res.render("index", { tasks, user });
  } catch (e) {
    console.error(e);
  }
});

router.get("/tasks/new", authorization, (req, res) => {
  res.render("newtask.ejs");
});

router.get("/tasks/:id", authorization, async (req,res) => {
    const { id } = req.params;
    const task = await fetchTaskById(id);
    res.render("detailtask.ejs", { task });
})

router.get("/tasks/edit/:id", authorization, async (req,res) => {
    const { id } = req.params;
    const task = await fetchTaskById(id);
    res.render("edit.ejs", { task });
})

router.post("/tasks", authorization, async (req, res) => {
    const { title, description } = req.body;
    await addTask(title,description,req.user.user_Id);
    res.redirect('/tasks');
});

router.patch("/tasks/:id", authorization, (req,res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    updateTaskById(id,title,description);
    res.redirect('/tasks');
})
router.delete("/tasks/:id", authorization, (req,res) => {
    const { id } = req.params;
    deleteTaskById(id);
    res.redirect("/tasks");
})

export default router;
