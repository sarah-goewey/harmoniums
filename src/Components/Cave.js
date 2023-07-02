import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Cave = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h2>
          Welcome {auth.username}!!
          <button onClick={() => dispatch(logout())}>Logout</button>
        </h2>
        <h2>Harmoniums Present:</h2>
        <h2>Messages Received:</h2>
      </div>
    </div>
  );
};

export default Cave;
