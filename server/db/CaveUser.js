const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;
const socketMap = require("../socketMap");

const CaveUser = conn.define("caveuser", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

CaveUser.prototype.messagesForUser = function () {
  return conn.models.message.findAll({
    order: [["createdAt"]],
    where: {
      [conn.Sequelize.Op.or]: [
        {
          toId: this.id,
        },
        {
          fromId: this.id,
        },
      ],
    },
    include: [
      {
        model: CaveUser,
        as: "from",
        attributes: ["username", "id"],
      },
      {
        model: CaveUser,
        as: "to",
        attributes: ["username", "id"],
      },
    ],
  });
};

CaveUser.prototype.sendMessage = async function (message) {
  message = await conn.models.message.create({ ...message, fromId: this.id });
  message = await conn.models.message.findByPk(message.id, {
    include: [
      {
        model: CaveUser,
        as: "from",
        attributes: ["id", "username"],
      },
      {
        model: CaveUser,
        as: "to",
        attributes: ["id", "username"],
      },
    ],
  });
  if (socketMap[message.toId]) {
    socketMap[message.toId].socket.send(
      JSON.stringify({ type: "CREATE_MESSAGE", message })
    );
  }
  return message;
};

CaveUser.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "could not find user";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

CaveUser.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

CaveUser.authenticate = async function ({ username }) {
  const user = await CaveUser.create({ username });
  if (user) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

//With this old version, new user only created if doesn't exist yet
/*User.authenticate = async function ({ username }) {
  let user = await this.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    user = await User.create({ username });
  }
  if (user) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};*/

module.exports = CaveUser;
