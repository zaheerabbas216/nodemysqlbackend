const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./connections/db");
const userRoutes = require("./routes/users.routes");
const projectRoutes = require("./routes/projects.routes");
const tasksRoutes = require("./routes/tasks.routes");
const auth = require("./helpers/auth");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(userRoutes);
app.use("/projects", auth, projectRoutes);
app.use("/tasks", auth, tasksRoutes);

app.get("/ping", (req, res, next) => {
  res.status(200).send("PONG");
});

app.get("/private", auth, (req, res, next) => {
  res.send("this is a private route, accessed with the token");
});

app.listen(PORT, () => {
  console.log(`Server started and running on the port ${PORT}`);
});
