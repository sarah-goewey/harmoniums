import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import OnlineUsers from "./OnlineUsers";

const Cave = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h2>Welcome to the cave, {auth.username}!</h2>
        <OnlineUsers />
        <h2>Messages Received:</h2>
        <button onClick={() => dispatch(logout())}>Leave Cave</button>
      </div>
    </div>
  );
};

export default Cave;
