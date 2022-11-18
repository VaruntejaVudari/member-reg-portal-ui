
import React from 'react';
import '../style.css';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submituserRegistrationForm(e) {
        e.preventDefault();
        if (this.validateForm()) {

            console.log("I am sending a request:");
            let fields = {};
            fields["username"] = "";
            fields["password"] = "";
            fields["name"] = "";
            fields["dob"] = "";
            fields["contactno"] = "";
            fields["address"] = "";
            fields["country"] = "";
            fields["pan"] = "";
            fields["state"] = "";
            fields["email"] = "";
            this.setState({ fields: fields });

            try {
                fetch("http://localhost:8081/memberRegPortal/registerMemberPortalDetails", {
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
                        alert("Member Registration was successful.");
                        //<Redirect replace to="/loginform"/>
                        this.props.history.push('/loginform');
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

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter your name.";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["name"] = "*Please enter alphabet characters only.";
            }
        }

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

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["contactno"]) {
            formIsValid = false;
            errors["contactno"] = "*Please enter your contact no.";
        }

        if (typeof fields["contactno"] !== "undefined") {
            if (!fields["contactno"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["contactno"] = "*Please enter 10 digit valid contact no.";
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

        if (!fields["address"]) {
            formIsValid = false;
            errors["address"] = "*Please enter your address.";
        }

        if (typeof fields["address"] !== "undefined") {
            if (!fields["address"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                //formIsValid = false;
                //errors["address"] = "*Please enter valid address.";
            }
        }

        if (!fields["state"]) {
            formIsValid = false;
            errors["state"] = "*Please enter your state.";
        }

        if (typeof fields["state"] !== "undefined") {
            if (!fields["state"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["state"] = "*Please enter valid state.";
            }
        }

        if (!fields["country"]) {
            formIsValid = false;
            errors["country"] = "*Please enter your country.";
        }

        if (typeof fields["country"] !== "undefined") {
            if (!fields["country"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["country"] = "*Please enter valid country.";
            }
        }

        if (!fields["dob"]) {
            formIsValid = false;
            errors["dob"] = "*Please enter your dob.";
        }

        if (typeof fields["dob"] !== "undefined") {
            const regexddmmyyy = /^(0[1-9]|[12][0-9]|3[01])[/ /.](0[1-9]|1[012])[/ /.](19|20)\d\d$/;
            if (regexddmmyyy.test(fields["dob"])) {
                formIsValid = true;
            } else {
                formIsValid = false;
                errors["dob"] = "*Please enter valid Date Of Birth, format is: DD/MM/YYYY";
            }
        }

        if (!fields["pan"]) {
            formIsValid = false;
            errors["pan"] = "*Please enter your pan no.";
        }

        if (typeof fields["pan"] !== "undefined") {
            if (!fields["pan"].match(/^([a-zA-Z]){5}[0-9]{4}([a-zA-Z]){1}?$/)) {
                formIsValid = false;
                errors["pan"] = "*Please enter valid pan no.";
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
                    <h3>Member Registration Portal</h3>
                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
                        <label>Name:</label>
                        <input type="text" name="name" value={this.state.fields.name} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.name}</div>
                        <label>Username:</label>
                        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.username}</div>
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.password}</div>

                        <label>Contact No:</label>
                        <input type="text" name="contactno" value={this.state.fields.contactno} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.contactno}</div>

                        <label>Email ID:</label>
                        <input type="text" name="email" value={this.state.fields.email} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.email}</div>

                        <label>State:</label>
                        <input type="text" name="state" value={this.state.fields.state} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.state}</div>
                        <label>Country:</label>
                        <input type="text" name="country" value={this.state.fields.country} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.country}</div>
                        <label>Address:</label>
                        <input type="textarea" name="address" value={this.state.fields.address} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.address}</div>
                        <label>Pan Card:</label>
                        <input type="text" name="pan" value={this.state.fields.pan} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.pan}</div>
                        <label>Date Of Birth:</label>
                        <input type="text" name="dob" value={this.state.fields.dob} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.dob}</div>

                        <input type="submit" className="button" value="Register" />
                    </form>
                </div>
            </div>
        );
    }
}


export default RegisterForm;