
import React from 'react';
import '../style.css';

class UpdateClaims extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.updateuserClaimsForm = this.updateuserClaimsForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    updateuserClaimsForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["firstName"] = "";
            fields["lastName"] = "";
            fields["dateOfAdmission"] = "";
            fields["dateOfDischarge"] = "";
            fields["dob"] = "";
            fields["providerName"] = "";
            fields["totalBillAmount"] = "";
            this.setState({ fields: fields });

            try {
                fetch("http://localhost:8081/memberSubmitClaims/memberUpdateClaimsDetails", {
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
                        alert("Claims Updated successfully.");
                        //<Redirect replace to="/loginform"/>
                        // this.props.history.push('/loginform');
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
        const regexddmmyyy = /^(0[1-9]|[12][0-9]|3[01])[/ /.](0[1-9]|1[012])[/ /.](19|20)\d\d$/;
        const re = /^[0-9\b]+$/;

        if (!fields["memberId"]) {
            formIsValid = false;
            errors["memberId"] = "*Please enter your member id.";
        }

        if ((typeof fields["memberId"] !== "undefined") && (fields["memberId"] !== '')) {
            if (!re.test(fields["memberId"])) {
                formIsValid = false;
                errors["memberId"] = "*Please enter numbers only.";
            }
        }

        if (!fields["firstName"]) {
            //formIsValid = false;
           //errors["firstName"] = "*Please enter your firstName.";
        }

        if (typeof fields["firstName"] !== "undefined") {
            if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
                //formIsValid = false;
                //errors["firstName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["lastName"]) {
            //formIsValid = false;
            //errors["lastName"] = "*Please enter your lastName.";
        }

        if (typeof fields["lastName"] !== "undefined") {
            if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
                //formIsValid = false;
                //errors["lastName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["dateOfAdmission"]) {
            formIsValid = false;
            errors["dateOfAdmission"] = "*Please enter your dateOfAdmission";
        }

        if (typeof fields["dateOfAdmission"] !== "undefined") {
            if (regexddmmyyy.test(fields["dateOfAdmission"])) {
                formIsValid = true;
            } else {
                formIsValid = false;
                errors["dateOfAdmission"] = "*Please enter valid dateOfAdmission, format is: DD/MM/YYYY";
            }
        }

        if (!fields["dateOfDischarge"]) {
            formIsValid = false;
            errors["dateOfDischarge"] = "*Please enter your dateOfDischarge";
        }

        if (typeof fields["dateOfDischarge"] !== "undefined") {
            if (regexddmmyyy.test(fields["dateOfDischarge"])) {
                formIsValid = true;
            } else {
                formIsValid = false;
                errors["dateOfDischarge"] = "*Please enter valid dateOfDischarge, format is: DD/MM/YYYY";
            }
        }

        if ((typeof fields["dateOfAdmission"] !== "undefined") && (typeof fields["dateOfDischarge"] !== "undefined")) {
            var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            var eDate = new Date(fields["dateOfDischarge"].replace(pattern, '$3-$2-$1'));
            var sDate = new Date(fields["dateOfAdmission"].replace(pattern, '$3-$2-$1'));
            if (eDate < sDate) {
                formIsValid = false;
                alert("Discharge Date can not be less than Admission Date");
            }
        }

        if (!fields["providerName"]) {
            formIsValid = false;
            errors["providerName"] = "*Please enter your providerName.";
        }

        if (typeof fields["providerName"] !== "undefined") {
            if (!fields["providerName"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["providerName"] = "*Please enter valid providerName.";
            }
        }

        if (!fields["totalBillAmount"]) {
            formIsValid = false;
            errors["totalBillAmount"] = "*Please enter your totalBillAmount.";
        }
        
        if ((typeof fields["totalBillAmount"] !== "undefined") && (fields["totalBillAmount"] !== '')) {
            if (!re.test(fields["totalBillAmount"])) {
                formIsValid = false;
                errors["totalBillAmount"] = "*Please enter numbers only.";
            }
        }

        if (!fields["dob"]) {
            formIsValid = false;
            errors["dob"] = "*Please enter your dob.";
        }
        if (typeof fields["dob"] !== "undefined") {
            if (regexddmmyyy.test(fields["dob"])) {
                formIsValid = true;
            } else {
                formIsValid = false;
                errors["dob"] = "*Please enter valid dob, date format is: DD/MM/YYYY";
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
                    <h3>Claims Update Portal</h3>
                    <form method="post" name="userClaimsForm" onSubmit={this.updateuserClaimsForm} >
                        <label>Member Id</label>
                        <input type="text" name="memberId" value={this.state.fields.memberId} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.memberId}</div>
                        <label>First Name</label>
                        <input type="text" name="firstName" value={"Varun"} onChange={this.handleChange} readOnly={true}/>
                        <div className="errorMsg">{this.state.errors.firstName}</div>
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={"Tej"} onChange={this.handleChange} readOnly={true}/>
                        <div className="errorMsg">{this.state.errors.lastName}</div>
                        <label>Date Of Admission</label>
                        <input type="text" name="dateOfAdmission" value={this.state.fields.dateOfAdmission} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.dateOfAdmission}</div>

                        <label>Date Of Discharge:</label>
                        <input type="text" name="dateOfDischarge" value={this.state.fields.dateOfDischarge} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.dateOfDischarge}</div>

                        <label>Provider Name:</label>
                        <input type="text" name="providerName" value={this.state.fields.providerName} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.providerName}</div>

                        <label>Total Bill Amount</label>
                        <input type="text" name="totalBillAmount" value={this.state.fields.totalBillAmount} maxLength={13} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.totalBillAmount}</div>
                        <label>Date Of Birth</label>
                        <input type="text" name="dob" value={this.state.fields.dob} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.dob}</div>

                        <input type="submit" className="button" value="Update" />
                    </form>
                </div>
            </div>

        );
    }

}

export default UpdateClaims;