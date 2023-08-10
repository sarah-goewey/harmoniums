const { CaveUser } = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await CaveUser.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
};
