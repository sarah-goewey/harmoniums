const express = require("express");
const app = express.Router();
const { Message, CaveUser } = require("../db");
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

app.put("/:id", async (req, res, next) => {
  try {
    const message = await Message.findByPk(req.params.id);
    res.send(await message.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    const messages = await req.user.messagesForUser();
    await messages.forEach((message) => message.destroy());
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
