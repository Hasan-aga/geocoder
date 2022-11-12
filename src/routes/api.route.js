"use strict";
const express = require("express");
const apiRouterController = require("../controllers/api.controler");
const bodyParser = require("body-parser");

const pathRouter = express.Router();
pathRouter.use(bodyParser.urlencoded({ extended: true }));
pathRouter.route("/routing").get(async (req, res) => {
  const { waypoints } = req.query;
  const points = [];
  waypoints
    .split("|")
    .map((coordinate) =>
      points.push(coordinate.split(",").map((p) => Number(p)))
    );

  try {
    const result = await apiRouterController.getRoutePosition(res, points);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: err.stack,
    });
  }
});

module.exports = pathRouter;
