//use dotenv to use .env file
require("dotenv").config();

const PORT = process.env.PORT || 9000;
const API_PATH = process.env.API_PATH || "/api";
const X_API_KEY = process.env.X_API_KEY || "binar-36";
const JWT_SECRET = process.env.JWT_SECRET || "@QEGTUI";
// Define the maximum size for uploading
// max 10 MB. ini optional 1 byte, 1000 b => 1kb, 1000kb => 1mb, 1000mb => 1gb
const MAX_UPLOAD_SIZE = process.env.MAX_UPLOAD_SIZE || 1024 * 1_0000;

module.exports = {
  PORT,
  API_PATH,
  X_API_KEY,
  JWT_SECRET,
  MAX_UPLOAD_SIZE,
};
