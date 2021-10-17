const sql = require("./db.ts");

// constructor
const Message = function(message) {
  this.sender = message.sender;
  this.receiver = message.receiver;
  this.content = message.content;
};

Message.create = (newMessage, result) => {
  sql.query("INSERT INTO messages SET ?", newMessage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created message: ", { id: res.insertId, ...newMessage });
    result(null, { id: res.insertId, ...newMessage });
  });
};

Message.findByReceiver= (receiver, result) => {
  sql.query('SELECT * FROM messages WHERE receiver = ? ', [receiver], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("messages: ", res);
    result(null, res);
  });
};

Message.getAll = result => {
  sql.query("SELECT * FROM messages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("messages: ", res);
    result(null, res);
  });
};

Message.initTable = result => {
  sql.query(`
  CREATE TABLE IF NOT EXISTS \`messages\` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  sender varchar(255) NOT NULL,
  receiver varchar(255) NOT NULL,
  content varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};


module.exports = Message;
