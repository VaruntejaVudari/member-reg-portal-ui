import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history=useHistory();
    
    function validateForm() {
        return username.length > 0 && password.length > 0;
      }

    async function sendLoginRequest() {
        console.log("I am sending a request:");
        const reqBody = {
            username: username,
            password: password,
        };
        try {
        await fetch("http://localhost:8081/memberRegPortal/loginMemberPortalDetails", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                },
            method: 'POST',
            body: JSON.stringify(reqBody),
        }).then(response => { 
            console.log(response);
            if(!response.ok) {
                throw Error('could not fetch the data for that resource');
            } else {
                alert("Login was successful.");
                history.push("/registration")
            }
            return response;
        })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <center>
                <h3>Member Login Portal</h3>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                </div>
                <div>
                    <button id="submit" type="button"disabled={!validateForm()} onClick={() => { sendLoginRequest() }} >
                        Login </button>
                </div>
            </center>
        </>
    );
}

export default Login;
