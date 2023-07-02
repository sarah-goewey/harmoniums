import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const onChange = (ev) => {
    setUsername(ev.target.value);
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(username));
  };
  return (
    <div>
      <form onSubmit={login}>
        <input
          placeholder="my name"
          value={username}
          name="username"
          onChange={onChange}
        />
        <button>Enter</button>
      </form>
    </div>
  );
};

export default Login;
