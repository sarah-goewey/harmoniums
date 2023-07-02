const conn = require("./conn");
const User = require("./User");

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: "moe" }),
    User.create({ username: "lucy" }),
    User.create({ username: "larry" }),
    User.create({ username: "ethyl" }),
  ]);

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
};
