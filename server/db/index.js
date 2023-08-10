const conn = require("./conn");
const CaveUser = require("./CaveUser");
const Message = require("./Message");

Message.belongsTo(CaveUser, { as: "from", onDelete: "CASCADE" });
Message.belongsTo(CaveUser, { as: "to", onDelete: "CASCADE" });

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  /*const [moe, lucy, larry, ethyl] = await Promise.all([
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
  };*/
};

module.exports = {
  syncAndSeed,
  CaveUser,
  Message,
};
