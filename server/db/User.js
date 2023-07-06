const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;
const socketMap = require("../socketMap");

const User = conn.define("user", {
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
    unique: true,
  },
});

User.prototype.messagesForUser = function () {
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
        model: User,
        as: "from",
        attributes: ["username", "id"],
      },
      {
        model: User,
        as: "to",
        attributes: ["username", "id"],
      },
    ],
  });
};

User.prototype.sendMessage = async function (message) {
  message = await conn.models.message.create({ ...message, fromId: this.id });
  message = await conn.models.message.findByPk(message.id, {
    include: [
      {
        model: User,
        as: "from",
        attributes: ["id", "username"],
      },
      {
        model: User,
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

User.findByToken = async function (token) {
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

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username }) {
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
};

module.exports = User;
