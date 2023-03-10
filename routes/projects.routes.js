const express = require("express");
const route = express.Router();
const projectsController = require("../controllers/projects.controllers");

route.post("/addproject", projectsController.addproject);
route.get("/getprojects", projectsController.getAllProjects);
route.put("/editProject/:id", projectsController.editProjects);
route.delete("/deleteProject/:id", projectsController.deleteProjects);

module.exports = route;
