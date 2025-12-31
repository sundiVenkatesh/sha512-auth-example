const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    salt TEXT,
    hash TEXT,
    iterations INTEGER,
    keylen INTEGER,
    digest TEXT
  )`);
});

function createUser({ username, salt, hash, iterations, keylen, digest }) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO users (username, salt, hash, iterations, keylen, digest) VALUES (?, ?, ?, ?, ?, ?)`,
      [username, salt, hash, iterations, keylen, digest], function(err) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
  });
}

function getUser(username) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
      if (err) {
        resolve(null);
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = { createUser, getUser };
