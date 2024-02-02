import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./../../firebase";

const login = (payload) => ({
  type: "LOGIN",
  payload,
});

const loginError = () => ({
  type: "LOGIN_ERROR",
});

const logout = () => ({
  type: "LOGOUT",
});

export const loginDispatcher = ({ email, password, remember }) => {
  return async (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (remember) localStorage.setItem("user", JSON.stringify(user));
        dispatch(login(user));
      })
      .catch((error) => {
        dispatch(loginError());
      });
  };
};

export const logoutDispatcher = () => {
  return async (dispatch) => {
    await signOut(auth);
    localStorage.removeItem("user");
    dispatch(logout());
  };
};

export const authorizeUser = () => {};
