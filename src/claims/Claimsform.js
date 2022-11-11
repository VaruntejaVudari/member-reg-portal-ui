
import React from 'react';
import '../style.css';


class Claimsform extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserClaimsForm = this.submituserClaimsForm.bind(this);

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserClaimsForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["firstname"]="";
          fields["lastname"] = "";
          fields["dateofadmission"] = "";
          fields["dateofdischarge"] = "";
          fields["dob"] = "";
          fields["providername"]="";
          fields["totalbillamount"] = "";
          this.setState({fields:fields});
      
          try {
            fetch("http://localhost:8081/memberSubmitClaims/submitMemberClaimsDetails", {
               headers: {
                   "Accept": "application/json",
                   "Content-Type": "application/json"
                   },
               method: 'POST',
               body: JSON.stringify(this.state.fields),
           }).then(response => { 
               console.log(response);
               if(!response.ok) {
                   throw Error('could not fetch the data for that resource');
               } else {
                   alert("Claim Submitted successfully.");
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

      if (!fields["firstname"]) {
        formIsValid = false;
        errors["firstname"] = "*Please enter your firstname.";
      }

      if (typeof fields["firstname"] !== "undefined") {
        if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["firstname"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["lastname"]) {
        formIsValid = false;
        errors["lastname"] = "*Please enter your lastname.";
      }

      if (typeof fields["lastname"] !== "undefined") {
        if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["lastname"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["dateofadmission"]) {
        formIsValid = false;
        errors["dateofadmission"] = "*Please enter your dateofadmission";
      }

      if (typeof fields["dateofadmission"] !== "undefined") {
        if (!fields["dateofadmission"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["dateofadmission"] = "*Please enter valid dateofadmission";
        }
      }

      if (!fields["dateofdischarge"]) {
        formIsValid = false;
        errors["dateofdischarge"] = "*Please enter your dateofdischarge";
      }

      if (typeof fields["dateofdischarge"] !== "undefined") {
        if (!fields["dateofdischarge"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["dateofdischarge"] = "*Please enter valid dateofdischarge";
        }
      }
      if (!fields["providername"]) {
        formIsValid = false;
        errors["providername"] = "*Please enter your providername.";
      }

      if (typeof fields["providername"] !== "undefined") {
        if (!fields["state"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["providername"] = "*Please enter valid providername.";
        }
      }

      if (!fields["totalbillamount"]) {
        formIsValid = false;
        errors["totalbillamount"] = "*Please enter your totalbillamount.";
      }

      if (typeof fields["totalbillamount"] !== "undefined") {
        if (!fields["totalbillamount"].match(/^[0-9]{30}$/)) {
          formIsValid = false;
          errors["totalbillamount"] = "*Please enter valid totalbillamount.";
        }
      }

      if (!fields["dob"]) {
        formIsValid = false;
        errors["dob"] = "*Please enter your dob.";
      }

      if (typeof fields["dob"] !== "undefined") {
        if (!fields["dob"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["dob"] = "*Please enter valid dob.";
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
        <h3>Claims Registration Portal</h3>
        <form method="post"  name="userClaimsForm"  onSubmit= {this.submituserClaimsForm} >
        <label>Firstname</label>
        <input type="text" name="firstname" value={this.state.fields.firstname} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.firstname}</div>
        <label>Lastname</label>
        <input type="text" name="lastname" value={this.state.fields.lastname} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.lastname}</div>
        <label>Dateofadmission</label>
        <input type="text" name="dateofadmission" value={this.state.fields.dateofadmission} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.dateofadmission}</div>

        <label>Dateofdischarge:</label>
        <input type="text" name="dateofdischarge" value={this.state.fields.dateofdischarge} onChange={this.handleChange}   />
        <div className="errorMsg">{this.state.errors.dateofdischarge}</div>
       
        <label>Providername:</label>
        <input type="text" name="providername" value={this.state.fields.providername} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.providername}</div>

        <label>Totalbillamount</label>
        <input type="text" name="totalbillamount" value={this.state.fields.totalbillamount} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.totalbillamount}</div>
        <label>Dob</label>
        <input type="text" name="dob" value={this.state.fields.pan} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.dob}</div>


        <input type="submit" className="button"  value="Submit"/>
        </form>
    </div>
</div>

      );
  }


}


export default Claimsform;