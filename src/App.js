import React from "react";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Claims from "./claims/Claims";
import RegisterForm from "./registration/RegisterForm";
import Loginform from "./login/Loginform";
import Claimsform from "./claims/Claimsform";

function App() {

  return (
    <Router>
      <Switch>
        {/* <Route base path="/" component={Login}></Route> */}
        <Route path="/login" component={Login}></Route>
        <Route path="/registration" component={Registration}></Route>
        <Route path="/claims" component={Claims}></Route>
        <Route path="/registerform" component={RegisterForm}></Route>
        <Route path="/loginform" component={Loginform}></Route>
        <Route path="/claimsform" component={Claimsform}></Route>
      </Switch>
    </Router>
  );
}

export default App;
