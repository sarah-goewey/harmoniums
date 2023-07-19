import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";

const Info = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h2>About the Cave</h2>
        <p>
          This app is based on{" "}
          <Link to="/vonnegut" style={{ color: "#fcfc84" }}>
            a passage from The Sirens of Titan by Kurt Vonnegut.
          </Link>
        </p>
        <p>
          You are a harmonium clinging to the jonquil-yellow walls of the caves
          of Mercury. You can tell others you are here, and you are glad they
          are here.
        </p>
        <p>The simplicity is intentional.</p>
        <p>Enjoy.</p>
      </div>
    </div>
  );
};

export default Info;
