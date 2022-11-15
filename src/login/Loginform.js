
import React from 'react';
import '../style.css';

class Loginform extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitUserLoginForm = this.submitUserLoginForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submitUserLoginForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["username"] = "";
            fields["password"] = "";
            this.setState({ fields: fields });
            //let history=useHistory();
            try {
                fetch("http://localhost:8081/memberRegPortal/loginMemberPortalDetails", {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify(this.state.fields),
                }).then(response => {
                    console.log(response);
                    if (!response.ok) {
                        throw Error('could not fetch the data for that resource');
                    } else {
                        alert("Login was successful.");
                        this.props.history.push('/searchclaims');
                    }
                    return response;
                })
            } catch (err) {
                console.log(err);
            }
        }

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {

        return (
            <div id="main-registration-container">
                <div id="register">
                    <h3>Login Form</h3>
                    <form method="post" name="userLoginForm" onSubmit={this.submitUserLoginForm} >
                        <label>Username</label>
                        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.username}</div>
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.password}</div>
                        <div><a href="/registerform">New User? Please register first.</a></div><br/>
                        <input type="submit" className="button" value="Login" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Loginform;