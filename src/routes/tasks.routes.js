const { Router } = require("express");
const {
  createTask,
  deleteTask,
  renderTasks,
  taskOne,
} = require("../controllers/tasks.controllers");
const loginAdmin = require("../controllers/loginAdmin.js");

const router = Router();

// Render all tasks
router.get("/", renderTasks);

router.get("/tasks/:id", taskOne);

router.post("/tasks/add", createTask);

router.delete("/tasks/:id/delete", deleteTask);

router.post("/login", loginAdmin);

module.exports = router;
