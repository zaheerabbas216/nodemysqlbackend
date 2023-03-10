const express = require("express");
const route = express.Router();
const taskController = require("../controllers/tasks.controller");

route.post("/createTask", taskController.createTask);
route.get("/getAllTasks", taskController.getAllTasks);
route.get("/getTask/:id", taskController.getTaskById);
route.put("/updateTask/:id", taskController.editTask);
route.delete("/deleteTask/:id", taskController.deleteTask);
route.get("/getTaskById/:id", taskController.getTasksByProjectId);

module.exports = route;
