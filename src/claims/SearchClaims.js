import React from 'react';
import '../style.css';

class SearchClaims extends React.Component {

    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
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

    searchuserClaimsForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["memberId"] = "";
            this.setState({ fields: fields });

            try {
                fetch("http://localhost:8081/memberSubmitClaims/retriveSubmitClaimsDetails", {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    method: 'GET',
                    //body: JSON.stringify(this.state.fields),
                }).then(response => {
                    console.log(response);
                    if (!response.ok) {
                        throw Error('could not fetch the data for that resource');
                    } else {
                        alert("Retrieved Claims Submitted successfully.");
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

        if (!fields["memberId"]) {
            //formIsValid = false;
            //errors["memberId"] = "*Please enter your claims no.";
        }

        if ((typeof fields["memberId"] !== "undefined") && (fields["memberId"] !== '')) {
            if (!Number(fields["memberId"])) {
                //formIsValid = false;
                //errors["memberId"] = "*Please enter numbers only.";
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
                        <input type="text" name="memberId" value={this.state.fields.memberId} onChange={this.handleChange} disabled="true"/>
                        <div className="errorMsg">{this.state.errors.memberId}</div>
                        
                        <input type="submit" className="button" value="Search" />
                        <div><a href="/claimsform">Please add claims and submit.</a></div><br/>
                        {/* <input type="submit" className="button" value="Add" /> */}
                    </form>
                </div>
            </div>
        );
    }

}

export default SearchClaims;