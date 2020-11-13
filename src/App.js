import React from "react";
import { Provider } from "./Provider";
import Main from "./components/Main";
import './app.scss';

const App = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};

export default App;
