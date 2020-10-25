/*
 * CS3099 Group A3
 */

import React from "react"
import "./App.scss"
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom"

//Pages
import LoginHandler from "./LoginHandler"
import PasswordResetForm from "./Components/PasswordReset"
import PageNotFound from "./Pages/404"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginHandler} />
            <Route exact path="/reset-password" component={PasswordResetForm} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
