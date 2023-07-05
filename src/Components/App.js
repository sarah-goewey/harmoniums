import React, { useEffect, useRef } from "react";
import Cave from "./Cave";
import Login from "./Login";
import Info from "./Info";
import Vonnegut from "./Vonnegut";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchOnlineUsers } from "../store";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import bootstrap from "bootstrap";

const App = () => {
  const { auth } = useSelector((state) => state);
  const prevAuth = useRef(auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const view = location.pathname;

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && auth.id) {
      console.log("just logged in");
      window.socket = new WebSocket(
        window.location.origin.replace("http", "ws")
      );
      window.socket.addEventListener("open", () => {
        window.socket.send(
          JSON.stringify({ token: window.localStorage.getItem("token") })
        );
      });
      window.socket.addEventListener("message", (ev) => {
        const message = JSON.parse(ev.data);
        if (message.type) {
          dispatch(message);
        }
      });
      dispatch(fetchOnlineUsers());
    }
    if (prevAuth.current.id && !auth.id) {
      console.log("just logged out");
      window.socket.close();
    }
  }, [auth]);

  useEffect(() => {
    prevAuth.current = auth;
  });

  return (
    <div className="container">
      <h1>Caves of Mercury</h1>
      {!auth.id && (
        <div>
          <nav className="navbar">
            <Link to="/" className={view === "/" ? "selected" : ""}>
              Enter The Cave
            </Link>
            <Link to="/info" className={view === "/info" ? "selected" : ""}>
              About The Cave
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/info" element={<Info />} />
            <Route path="/vonnegut" element={<Vonnegut />} />
          </Routes>
        </div>
      )}
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/" className={view === "/" ? "selected" : ""}>
              Cave
            </Link>
            <Link to="/info" className={view === "/info" ? "selected" : ""}>
              About The Cave
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<Cave />} />
            <Route path="/info" element={<Info />} />
            <Route path="/vonnegut" element={<Vonnegut />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
