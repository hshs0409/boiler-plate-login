import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import ProfilePage from "./components/views/profilePage/ProfilePage";
import Auth from "./hoc/auth";
import Reaction from "./components/views/Reaction/Reaction";
import Rsp from "./components/views/Rsp/Rsp";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/signUp" component={Auth(RegisterPage, false)} />
          <Route exact path="/profile" component={Auth(ProfilePage, true)} />
          <Route exact path="/reaction" component={Reaction} />
          <Route exact path="/rsp" component={Rsp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
