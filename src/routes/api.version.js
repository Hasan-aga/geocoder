const express = require("express");
const pathRouter = require("./api.route");

const api = express.Router();
api.use(pathRouter);

module.exports = api;
