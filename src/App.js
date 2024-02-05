import { Provider } from "react-redux";

import "normalize.css";
import "./App.css";

import confegureStore from "./store/confegureStore";
import AppRouter from "./routers/AppRouter";

function App() {
  const store = confegureStore();

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
