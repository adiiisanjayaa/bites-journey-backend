//use dotenv to use .env file
require("dotenv").config();

const PORT = process.env.PORT || 9000;
const API_PATH = process.env.API_PATH || "/api";
const X_API_KEY = process.env.X_API_KEY || "binar-36";
const JWT_SECRET = process.env.JWT_SECRET || "@QEGTUI";
const seperated = ".c.";

module.exports = {
  PORT,
  API_PATH,
  X_API_KEY,
  JWT_SECRET,
  seperated,
};
