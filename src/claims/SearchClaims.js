import React from 'react';
import '../style.css';

class SearchClaims extends React.Component {

    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},
            res: {},
            resList: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.searchuserClaimsForm = this.searchuserClaimsForm.bind(this);
    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

    async searchuserClaimsForm(e) {
        e.preventDefault();
        if (this.validateForm()) {

            console.log("I am sending a request:");
            let fieldsId = this.state.fields;
            let fields = {};
            this.setState({
                res: '',
                resList: [],
                fields: fields
            });
            fields["memberId"] = "";

            if ((typeof fieldsId["memberId"] !== "undefined") && (fieldsId["memberId"] !== '')) {
                try {
                    const response = await fetch("http://localhost:8080/memberSubmitClaims/retriveSubmitClaimsDetailsByMemberId", {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        method: 'POST',
                        body: JSON.stringify(this.state.fields),
                    })
                    if (!response.ok) {
                        alert('No records found for selected criteria.');
                        throw Error('could not fetch the data for that resource');
                    } else {
                        const data = await response.json();
                        this.setState({
                            res: data
                        });
                        alert('Retrieved claims number: ' + data.memberId + ' details successfully.');
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    const response = await fetch("http://localhost:8080/memberSubmitClaims/retriveSubmitClaimsDetails", {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        method: 'GET',
                        //body: JSON.stringify(this.state.fields),
                    })
                    if (!response.ok) {
                        alert('No records found!.');
                        throw Error('could not fetch the data for that resource');
                    } else {
                        const resp = await response.json();
                        this.setState({
                            resList: resp
                        });
                        alert("Retrieved all submit claims successfully.");
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    async updateClaims (e,memberId) {
        console.log("updateClaims called: " + memberId);

        e.preventDefault();
        this.setState({
            res: '',
            resList: [],
        });
        let inputData = {memberId};
        try {
            const response = await fetch("http://localhost:8080/memberSubmitClaims/retriveSubmitClaimsDetailsByMemberId", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(inputData),
            })
            if (!response.ok) {
                alert('No records found for selected criteria.');
                throw Error('could not fetch the data for that resource');
            } else {
                const data = await response.json();
                console.log("data: " + data.firstName +','+ data.lastName);
                //alert('Redirect to claims update form by using claims number: ' + memberId + '');
                this.props.history.push('/updateclaims');
            }
        } catch (err) {
            console.log(err);
        }
    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["memberId"]) {
            //formIsValid = false;
            //errors["memberId"] = "*Please enter your claims no.";
        }

        const re = /^[0-9\b]+$/;
        if ((typeof fields["memberId"] !== "undefined") && (fields["memberId"] !== '')) {
            if (!re.test(fields["memberId"])) {
                formIsValid = false;
                errors["memberId"] = "*Please enter numbers only.";
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
                    <h3>Claims Search Portal</h3>
                    <form method="post" name="userClaimsForm" onSubmit={this.searchuserClaimsForm} >
                        <label>Claims No</label>
                        <input type="text" name="memberId" value={this.state.fields.memberId} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.memberId}</div>

                        <input type="submit" className="button" value="Search" />
                        <div><a href="/claimsform">Please add claims and submit.</a></div><br />
                        {/* <input type="submit" className="button" value="Add" /> */}

                        {Object.keys(this.state.res).map((key, idx) => (
                            <p key={idx}>{this.state.res[key]}</p>
                        ))}

                        {this.state.resList.map((item,i) => (
                            <div key={i}> 
                                {/* <div>Claims No: {item.memberId} <a href="#" onClick={(e) => this.updateClaims(e,item.memberId)}>Edit</a></div> */}
                                <div>Claims No: <a href="#" onClick={(e) => this.updateClaims(e,item.memberId)}>{item.memberId}</a></div>
                                <div>First Name: {item.firstName}</div>
                                <div>Last Name: {item.lastName}</div>
                                <div>Date Of Birth: {item.dob}</div>
                                <div>Date Of Admission: {item.dateOfAdmission}</div>
                                <div>Date Of Discharge: {item.dateOfDischarge}</div>
                                <div>Provider Name: {item.providerName}</div>
                                <div>Total Bill Amount: {item.totalBillAmount}</div>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        );
    }

}

export default SearchClaims;