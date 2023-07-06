const express = require("express");
const app = express.Router();
const { Message, User } = require("../db");
const { isLoggedIn } = require("./middleware.js");

module.exports = app;

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const response = await req.user.messagesForUser();
    res.send(response);
  } catch (ex) {
    next(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.sendMessage(req.body));
  } catch (ex) {
    next(ex);
  }
});
