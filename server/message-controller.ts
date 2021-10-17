const Message = require("./message-model.ts");

// Create and Save a new Message
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Message
  const message = new Message({
    sender: req.body.sender,
    receiver: req.body.receiver,
    content: req.body.content
  });

  // Save Message in the database
  Message.create(message, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message."
      });
    else res.send(data);
  });
};

// Find all messages belonging to a receiver
exports.findByReceiver = (req, res) => {
  Message.findByReceiver(req.params.receiver, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Message.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.initTable = (req, res) => {
  Message.initTable((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating table."
      });
    else res.send(data);
  });
};
