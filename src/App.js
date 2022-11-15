import React from "react";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Claims from "./claims/Claims";
import RegisterForm from "./registration/RegisterForm";
import Loginform from "./login/Loginform";
import Claimsform from "./claims/Claimsform";
import SearchClaims from "./claims/SearchClaims";
import UpdateClaims from "./claims/UpdateClaims";

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
        <Route path="/searchclaims" component={SearchClaims}></Route>
        <Route path="/updateclaims" component={UpdateClaims}></Route>
        <Route path="/" base component={Loginform}></Route>
      </Switch>
    </Router>
  );
}

export default App;
