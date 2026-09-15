const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

module.exports = { readDb, writeDb };
