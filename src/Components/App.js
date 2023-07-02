import React, { useEffect } from "react";
import Cave from "./Cave";
import Login from "./Login";
import Info from "./Info";
import Vonnegut from "./Vonnegut";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1>Caves of Mercury</h1>
      {!auth.id && (
        <div>
          <nav>
            <Link to="/">Enter The Cave</Link>
            <Link to="/info">About The Cave</Link>
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
            <Link to="/">Cave</Link>
            <Link to="/info">About The Cave</Link>
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
