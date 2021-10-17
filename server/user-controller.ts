const User = require("./user-model.ts");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    questionAnswer: req.body.questionAnswer
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Find a single User with a customerId
exports.findOne = (req, res) => {
  User.findByUsername(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with username " + req.params.username
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateByUsername(
    req.params.username,
    req.body.password,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with username ${req.params.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with username " + req.params.username
          });
        }
      } else res.send(data);
    }
  );
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.initTable = (req, res) => {
  User.initTable((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating table."
      });
    else res.send(data);
  });
};
