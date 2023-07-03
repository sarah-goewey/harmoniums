import React, { useEffect } from "react";
import Cave from "./Cave";
import Login from "./Login";
import Info from "./Info";
import Vonnegut from "./Vonnegut";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import bootstrap from "bootstrap";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const view = location.pathname;
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

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
