// import { v4 as uuid } from "uuid";
const uuid = require("uuid");
const db = require("../connections/db");

module.exports = {
  createTask: (req, res, next) => {
    try {
      let task = {
        task_id: req.body.task_id,
        board_name: req.body.board_name,
        task_name: req.body.task_name,
        task_details: req.body.task_details,
        status: req.body.status,
      };
      let sql = "INSERT INTO tasks SET ?";
      db.query(sql, task, (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "error creating the task" });
        }
        res.status(200).send({
          status: true,
          message: "Task created successfully",
          data: result,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAllTasks: (req, res, next) => {
    try {
      let sql = "SELECT * FROM tasks";
      db.query(sql, (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "Error getting the tasks" });
        }

        if (result.length === 0) {
          res.status(400).send({ status: false, message: "No Tasks found" });
        }
        res.status(200).send({ status: true, data: result });
      });
    } catch (error) {
      next(error);
    }
  },

  getTaskById: (req, res, next) => {
    try {
      let task_id = req.params.id;
      let sql = "SELECT * FROM tasks WHERE task_id = ?";
      db.query(sql, task_id, (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "error getting the data" });
        }
        res.status(200).send({ status: true, data: result });
      });
    } catch (error) {
      next(error);
    }
  },

  editTask: (req, res, next) => {
    try {
      let task_id = req.params.id;
      let board_name = req.body.board_name;
      let status = req.body.status;
      let sql = "UPDATE tasks SET board_name = ?, status = ? WHERE task_id = ?";
      db.query(sql, [board_name, status, task_id], (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "Error updating the data" });
        }
        res.status(200).send({
          status: true,
          message: "Task updated successfully",
          data: result,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  deleteTask: (req, res, next) => {
    try {
      let task_id = req.params.id;
      let sql = "DELETE FROM tasks WHERE task_id = ?";
      db.query(sql, task_id, (err, next) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "error deleting the data" });
        }
        res
          .status(200)
          .send({ status: true, message: "Data deleted successfully" });
      });
    } catch (error) {
      next(error);
    }
  },
  getTasksByProjectId: (req, res, next) => {
    try {
      let project_id = req.params.id;

      let sql =
        "SELECT * FROM projects RIGHT JOIN tasks ON projects.project_id = tasks.project_id WHERE projects.project_id = ?";

      db.query(sql, project_id, (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "Error getting tasks" });
        }

        if (result.length === 0) {
          res.status(400).send({ status: false, message: "No tasks found" });
        }
        res.status(200).send({ status: true, data: result });
      });
    } catch (error) {
      next(error);
    }
  },
};
