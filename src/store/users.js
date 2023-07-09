import axios from "axios";

const users = (state = [], action) => {
  if (action.type === "SET_USERS") {
    return action.users;
  }
  if (action.type === "ADD_USER") {
    return [...state, action.user];
  }
  if (action.type === "DELETE_USER") {
    return state.filter((u) => u.id !== action.user.id);
  }
  return state;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/users");
    dispatch({ type: "SET_USERS", users: response.data });
  };
};

export const removeUser = (user) => {
  return async (dispatch) => {
    await axios.delete(`api/users/${user.id}`);
    dispatch({ type: "DELETE_USER", user });
  };
};

export default users;
