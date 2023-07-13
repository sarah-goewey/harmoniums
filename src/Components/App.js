import React, { useEffect, useRef } from "react";
import Cave from "./Cave";
import Login from "./Login";
import Info from "./Info";
import Vonnegut from "./Vonnegut";
import { useSelector, useDispatch } from "react-redux";
import {
  loginWithToken,
  fetchOnlineUsers,
  fetchMessages,
  fetchUsers,
} from "../store";
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
      console.log("auth.id", auth.id);
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
      dispatch(fetchMessages());
      dispatch(fetchUsers());
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
      <div className="inner">
        <h1 className="display-1 text-center">Caves of Mercury</h1>
        {!auth.id && (
          <div>
            <nav className="navbar">
              <Link
                to="/"
                className={view === "/" ? "nav-link active" : "nav-link"}
                aria-current={view === "/" ? "page" : ""}
              >
                Enter The Cave
              </Link>
              <Link
                to="/info"
                className={view === "/info" ? "nav-link active" : "nav-link"}
                aria-current={view === "/info" ? "page" : ""}
              >
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
              <Link
                to="/"
                className={view === "/" ? "nav-link active" : "nav-link"}
              >
                Cave
              </Link>
              <Link
                to="/info"
                className={view === "/info" ? "nav-link active" : "nav-link"}
              >
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
    </div>
  );
};

export default App;
