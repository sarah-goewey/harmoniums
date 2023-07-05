const conn = require("./conn");
const User = require("./User");
const Message = require("./Message");

Message.belongsTo(User, { as: "from" });
Message.belongsTo(User, { as: "to" });

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: "moe" }),
    User.create({ username: "lucy" }),
    User.create({ username: "larry" }),
    User.create({ username: "ethyl" }),
  ]);

  await Message.create({ toId: moe.id, fromId: lucy.id, txt: "Here I am" });

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
  Message,
};
