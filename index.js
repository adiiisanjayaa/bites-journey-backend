const express = require("express");
const http = require("http");
const mainApp = require("./apps/router");
const { PORT } = require("./apps/configs/config");

//initialize express app
const expressApp = express();

//use main app
expressApp.use(mainApp);

// Server HTTP
const httpServer = http.createServer(expressApp);
httpServer.listen(PORT, () => {
  console.log(`run on : http://localhost:${PORT}`);
});
