import React, { useState } from "react";
//import getRestDataAPIRequest from "./api/denodoAPI";

function App() {

  const [data, setData] = useState({
    username :'',
    password : ''
  });

  const {username, password} = data;

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const changeHandler = e => {
    setData({...data,[e.target.name]:[e.target.value]})
  }

  const submitHandler = e => {
    console.log(data);
    //getLoginFormViewData(data);
  }

  // function getLoginFormViewData(data) {
  //   console.log("getLoginFormViewData:");
  //   let configURL = 'http://localhost:8080/memberRegPortal/loginMemberPortalDetails&$format=JSON&data=${data}'
  //   return getRestDataAPIRequest(configURL);
  // }

  return (
    <div className="Login">
      <center>
        <form onSubmit={submitHandler}>
          <label>Username : </label>
          <input type="text" name="username" value={username} onChange={changeHandler}/> <br />
          <label>Password : </label>
          <input type="password" name="password" value={password} onChange={changeHandler}/> <br />
          <input type="submit" name="submit" disabled={!validateForm()}></input>
        </form>
      </center>
    </div>
  );
}

export default App;
