import React, { Component, useState, useHistory } from "react";
import apiService from "../services/apiService";

const initialUser = {
    username: '',
    password: ''
}

const Login = () => {

    // const { username, password } = data;
    // const history = useHistory();

    // function validateForm() {
    //     return username.length > 0 && password.length > 0;
    // }

    // const changeHandler = e => {
    //     setData({ ...data, [e.target.name]: [e.target.value] })
    // }

    // const submitHandler = e => {
    //     console.log(data);
    //     isvaidUser(data);
    // }

    const [user, setUserData] = useState(initialUser);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...user,
            [name]: value ? value : null,
        });
    };

    const checkUserDetails = async (user) => {
        apiService.post('/memberRegPortal/loginMemberPortalDetails', user).then(response => {
            console.log("response::", response);
        }).catch(error => {
                console.log("error::", error);
        });
    };

    return (
        <div className="Login">
            <center>
                <form>
                    <label htmlFor="username">User Name:</label>
                    <input type="text"  name='username' value={user.username}  onChange={handleInputChange} /> <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={user.password} onChange={handleInputChange} /> <br />
                    <button onClick={() => checkUserDetails(user)}>Login</button>
                </form>
            </center>
        </div>
    );
}

export default Login;