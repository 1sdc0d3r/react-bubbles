import React, { useState } from "react";
import "./styles.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "./utils/PrivateRoute";
import Login from "./components/Login";
import BubblesPage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <BubblesPage /> */}
          <Route exact path="/" component={Login} />
          {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
          <PrivateRoute exact path="/bubbles" component={BubblesPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
