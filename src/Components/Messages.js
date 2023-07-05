import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Messages = () => {
  const { auth, onlineUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Messages Received: </h2>
    </div>
  );
};

export default Messages;
