import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage, updateMessage } from "../store";

const Messages = () => {
  const { auth, onlineUsers, messages, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onlineIDs = onlineUsers.map((user) => user.id);

  const sendMessage = (toId) => {
    dispatch(createMessage({ toId, fromId: auth.id, txt: "So glad you are" }));
  };

  const markAsReplied = (message) => {
    dispatch(
      updateMessage({
        id: message.id,
        toId: message.toId,
        fromId: message.fromId,
        txt: message.txt,
        replied: true,
      })
    );
  };

  if (!users) {
    return null;
  }

  return (
    <div>
      <h2>Messages Received: </h2>
      <ul>
        {messages
          .filter((message) => message.toId === auth.id)
          .map((message) => {
            const fromUser = users.find((user) => user.id === message.fromId);
            if (!!fromUser) {
              return (
                <li key={message.id}>
                  from {fromUser.username}: {message.txt}{" "}
                  {message.txt === "Here I am" &&
                    message.replied === false &&
                    onlineIDs.includes(fromUser.id) && (
                      <button
                        onClick={() => {
                          sendMessage(fromUser.id);
                          markAsReplied(message);
                        }}
                      >
                        So glad you are
                      </button>
                    )}
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default Messages;
