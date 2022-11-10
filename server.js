const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();

const api = require("./src/routes/api.route");
const app = express();
app.use("/api", api);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  console.error(`Request Error ${req.url} - ${err.status}`);
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});
const port = process.env.PORT || "3000";
app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
