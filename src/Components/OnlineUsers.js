import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const OnlineUsers = () => {
  const { auth, onlineUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Harmoniums Present ({onlineUsers.length}): </h2>
      <ul>
        {onlineUsers.map((user) => {
          return <li key={user.id}>{user.username}</li>;
        })}
      </ul>
    </div>
  );
};

export default OnlineUsers;
