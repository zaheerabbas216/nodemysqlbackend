const db = require("../connections/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res, next) => {
    try {
      let user = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hash(req.body.password, 8),
        project: req.body.project,
        role: req.body.role,
      };

      bcrypt
        .hash(req.body.password, 8)
        .then((hash) => {
          user.password = hash;
        })
        .then(() => {
          let sql = "INSERT INTO users SET ?";
          db.query(sql, user, (err, result) => {
            if (err) {
              res.send({ message: "Error creating the user" });
            }
          });

          db.query(
            "SELECT * from users WHERE email=?",
            user.email,
            (err, response) => {
              if (err) {
                res.send({ message: err });
              }
              return res.status(201).send({
                userdata: response,
                message: "successfully registered!",
              });
            }
          );
        });
    } catch (error) {
      next(error);
    }
  },

  login: (req, res, next) => {
    try {
      const { email, password } = req.body;
      db.query("SELECT * FROM users WHERE email =?", email, (err, result) => {
        if (err) {
          return res.status(400).send({ mesaage: err });
        }

        if (result.length === 0) {
          return res.status(401).send({
            message: "Email or password is invalid",
          });
        }

        bcrypt.compare(password, result[0].password).then((isMatch) => {
          if (isMatch === false) {
            return res.status(401).send({
              message: "email or Password is incorrect ",
            });
          }
          //   generate token
          const token = jwt.sign(
            { id: result[0].user_id.toString() },
            process.env.SECRET_KEY
          );
          return res.status(200).send({
            message: "Logged in successfully",
            user: result[0],
            token,
          });
        });
      });
    } catch (error) {
      next(error);
    }
  },
};
