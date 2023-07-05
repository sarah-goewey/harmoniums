const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER, ENUM } = conn.Sequelize;

const Message = conn.define("message", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  txt: {
    type: ENUM("Here I am", "So glad you are"),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  toId: {
    type: UUID,
    allowNull: false,
  },
  fromId: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = Message;
