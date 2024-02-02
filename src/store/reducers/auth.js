const INITIAL_STATE = JSON.parse(localStorage.getItem("user")) || {};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGIN_ERROR":
      return {
        error: true,
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default authReducer;
