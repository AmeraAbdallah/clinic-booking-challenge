import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
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
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      dispatch(logout());
    } catch (err) {
      console.log("something is wrong", err);
    }
  };
};

export const signup = async ({ email, password }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return Promise.resolve("acount created!");
  } catch (err) {
    return Promise.reject(err);
  }
};
