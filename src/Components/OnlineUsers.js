import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store";

const OnlineUsers = () => {
  const { auth, onlineUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  const sendMessage = (toId) => {
    dispatch(createMessage({ toId, fromId: auth.id, txt: "Here I am" }));
  };

  return (
    <div>
      <h2>Harmoniums Present ({onlineUsers.length}): </h2>
      <ul>
        {onlineUsers.map((user) => {
          return (
            <li key={user.id}>
              {user.username}{" "}
              <button onClick={() => sendMessage(user.id)}>Here I am</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OnlineUsers;
