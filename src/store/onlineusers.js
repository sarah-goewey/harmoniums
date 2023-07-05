import axios from "axios";

const onlineUsers = (state = [], action) => {
  if (action.type === "SET_ONLINE_USERS") {
    return action.onlineUsers;
  }
  if (action.type === "LOGIN") {
    return [...state, action.user];
  }
  if (action.type === "LOGOUT") {
    return state.filter((u) => u.id !== action.user.id);
  }
  return state;
};

export const fetchOnlineUsers = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/onlineUsers", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_ONLINE_USERS", onlineUsers: response.data });
  };
};

export default onlineUsers;
