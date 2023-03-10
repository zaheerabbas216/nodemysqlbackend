const db = require("../connections/db");

module.exports = {
  addproject: (req, res, next) => {
    try {
      let project = {
        project_id: req.body.project_id,
        project_name: req.body.project_name,
      };
      let sql = "INSERT INTO projects SET ?";
      db.query(sql, project, (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "Error creating project" });
        }
        res.status(200).send({
          status: true,
          message: "Project Created Successfully",
          data: result,
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getAllProjects: (req, res, next) => {
    try {
      let sql = "SELECT * FROM projects";
      db.query(sql, (err, result) => {
        if (err) {
          res.status(400).send({ message: "error getting the projects" });
        }
        if (result.length === 0) {
          res.status(400).send({ message: "No projects found" });
        }

        res.status(200).send({ status: true, data: result });
      });
    } catch (error) {
      next(error);
    }
  },
  editProjects: (req, res, next) => {
    try {
      let project_id = req.params.id;
      let project_name = req.body.project_name;
      let sql = "UPDATE projects SET project_name = ? WHERE project_id =?";
      db.query(sql, [project_name, project_id], (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "error updating the data" });
        }
        res.status(200).send({ status: true, message: "Updated the data" });
      });
    } catch (error) {
      next(error);
    }
  },
  deleteProjects: (req, res, next) => {
    try {
      let project_id = req.params.id;
      let sql = "DELETE FROM projects WHERE project_id = ?";
      db.query(sql, project_id, (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "Error deleting the data" });
        }

        res
          .status(200)
          .send({ status: true, message: "Project Deleted Successfully" });
      });
    } catch (error) {
      next(error);
    }
  },
};
