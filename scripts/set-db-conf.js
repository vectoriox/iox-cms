const fs = require("fs");
const dbConfPath = "../config/environments/production/database.json";

let config = require(dbConfPath);
config.connections.default.connector         =  process.env.DB_CONNECTOR || "mongoose";
config.connections.default.settings.database =  process.env.DB_NANE      || "liora-portfolio",
config.connections.default.settings.host     =  process.env.DB_HOST      || "bambook-p73kk.mongodb.net",
config.connections.default.settings.database =  process.env.DB_PORT      || "27017",
config.connections.default.settings.database =  process.env.DB_USER      || "doron",
config.connections.default.settings.database =  process.env.DB_PASS      || "omer2017",

console.log(JSON.stringify(config));


fs.writeFileSync("config/environments/production/database.json", JSON.stringify(config));