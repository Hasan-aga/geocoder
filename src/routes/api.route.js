"use strict";
const express = require("express");
const apiRouterController = require("../controllers/api.controler");
const bodyParser = require("body-parser");

const pathRouter = express.Router();
pathRouter.use(bodyParser.urlencoded({ extended: true }));
pathRouter
  .route(
    "/getrouteposition/:startlatitude/:startlongitude/:finishlatitude/:finishlongitude"
  )
  .get(apiRouterController.getRoutePosition);

module.exports = pathRouter;
