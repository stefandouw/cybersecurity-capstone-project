const sql = require("./db.ts");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.questionAnswer = user.questionAnswer;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByUsername = (username, result) => {
  sql.query('SELECT * FROM users WHERE username = ?', [username], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the username
    result({ kind: "not_found" }, null);
  });
};

User.updateByUsername = (username, password, result) => {
  sql.query(
    "UPDATE users SET password = ? WHERE username = ?",
    [password, username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { username: username });
      result(null, { username: username });
    }
  );
};

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.initTable = result => {
  sql.query(`
  CREATE TABLE IF NOT EXISTS \`users\` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  questionAnswer varchar(255) NOT NULL
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


module.exports = User;
