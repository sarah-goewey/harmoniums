import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, removeUser } from "../store";
import OnlineUsers from "./OnlineUsers";
import Messages from "./Messages";

const Cave = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h2>Welcome to the cave, {auth.username}!</h2>
        <OnlineUsers />
        <Messages />
        <button
          onClick={() => {
            dispatch(removeUser(auth));
            dispatch(logout());
          }}
        >
          Leave Cave
        </button>
      </div>
    </div>
  );
};

export default Cave;
