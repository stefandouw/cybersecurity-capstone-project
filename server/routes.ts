module.exports = app => {
  const users = require("./user-controller.ts");
  const messages = require("./message-controller.ts");

  // Create a new User
  app.post("/users", users.create);

  // Retrieve a single User with username
  app.get("/users/:username", users.findOne);

  // Update a User record
  app.put("/users/:username", users.update);

  // Retrieve all users
  app.get("/users", users.findAll);

  // Create users table
  app.get("/init-users", users.initTable);

  // ------------------------------------------------------

  // Create a new Message
  app.post("/messages", messages.create);

  // Retrieve all messages for receiver
  app.get("/messages/:receiver", messages.findByReceiver);

  // Retrieve all messages
  app.get("/messages", messages.findAll);

  // Create messages table
  app.get("/init-messages", messages.initTable);
};
