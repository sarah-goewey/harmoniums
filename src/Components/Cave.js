import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, removeUser, removeMyMessages } from "../store";
import OnlineUsers from "./OnlineUsers";
import Messages from "./Messages";

const Cave = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const clearLog = () => {
    dispatch(removeMyMessages(auth));
  };

  return (
    <div className="cave">
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
        <button onClick={clearLog}>Clear Log</button>
      </div>
    </div>
  );
};

export default Cave;
