import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/auth";

const composeEnhanccers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
    }),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeEnhanccers(applyMiddleware(thunk))
  );
  return store;
};

export default configureStore;
