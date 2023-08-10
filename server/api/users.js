const express = require("express");
const app = express.Router();
const { CaveUser } = require("../db");
const { isLoggedIn } = require("./middleware.js");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await CaveUser.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const user = await CaveUser.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
