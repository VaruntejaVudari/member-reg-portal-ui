import React, { useState } from "react";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //const [jwt, setJwt] = useLocalState("", "jwt");

    async function sendLoginRequest() {
        console.log("I am sending a request:");
        const reqBody = {
            username: username,
            password: password,
        };

        try {
        await fetch("http://localhost:8080/memberRegPortal/loginMemberPortalDetails", {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            method: "POST",
            body: JSON.stringify(reqBody),
            mode: 'no-cors'
        //}).then((response) => Promise.all(response.json()))
        }).then(response => { 
            response.header("Access-Control-Allow-Origin", "*");
            response.setHeader(
                "Access-Control-Allow-Methods",
                "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
            );
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization", "Access-Control-Allow-Origin");
            if(response.ok) {
                console.log(response)
            } else {
              throw Error('could not fetch the data for that resource');
            }
            return response.json()})
        .then(response => console.log('Success: ', response))
                //setJwt(headers.get("authorization"));
        } catch (err) {
            console.log(err);
        }
        // fetch("http://localhost:8080//memberRegPortal/loginMemberPortalDetails", {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     method: "POST",
        //     body: JSON.stringify(reqBody),
        // }).then((response) => Promise.all([response.json(), response.headers]))
        //     .then(([body, headers]) => {
        //         //setJwt(headers.get("authorization"));
        //     });
    }

    return (
        <>
            <center>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="email" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                </div>
                <div>
                    <button id="submit" type="button" onClick={() => { sendLoginRequest() }} >
                        Login </button>
                </div>
            </center>
        </>
    );
}

export default LoginPage;
