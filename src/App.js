import { Provider } from "react-redux";

import "normalize.css";
//import './styles/style.scss'

import confegureStore from "./store/confegureStore";
import AppRouter from "./routers/AppRouter";

import { authorizeUser } from "./store/actions/auth";

function App() {
  const store = confegureStore();
  //store.dispatch(authorizeUser());

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
