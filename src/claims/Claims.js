import React, { useState } from "react";
import { useHistory } from "react-router";

const Claims = () => {

    let history = useHistory();
    // States for Claims Submission
    const [firstname, setFirstname] = useState('');
    const[lastname,setLastname] = useState('');
    const[dob,setDob] = useState('');
    const[dateofadmission,setDateofadmission] = useState('');
    const[dateofdischarge,setDateofdischarge]=useState('');
    const[providername,setProvidername]=useState('');
    const[totalbillamount,setTotalbillamount]=useState('');

    function validateForm(){
        return firstname.length > 0 && lastname.length > 0 && dob.length > 0 && 
        dateofadmission.length > 0&& dateofdischarge.length > 0 && providername.length > 0 &&
        totalbillamount.length > 0;
    }

    async function sendRegistrationRequest() {
        console.log("I am sending a request:");
        const reqBody = {
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            dateofdischarge : dateofdischarge,
            dateofadmission : dateofadmission,
            providername : providername,
            totalbillamount : totalbillamount
        }


    try {
        await fetch("http://localhost:8081/memberSubmitClaims/submitMemberClaimsDetails", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(reqBody),
        }).then(response => {
            console.log(response);
            if (!response.ok) {
                throw Error('could not fetch the data for that resource');
            } else {
                alert("Claim submission was successful.");
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
        <div className="form">
            <div>
                <center>
                    <h1>Claims Portal</h1>
                </center>
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Firstname</label>
                <input onChange={(e) => setFirstname(e.target.value)} className="input"
                    value={firstname} type="text" />

                <label className="label">Lastname</label>
                <input onChange={(e) => setLastname(e.target.value)} className="input"
                    value={lastname} type="text" />

                <label className="label">Dob</label>
                <input onChange={(e) => setDob(e.target.value)} className="input"
                    value={dob} type="dob" /> <br/>

                <label className="label">Dateofadmission</label>
                <input onChange={(e) => setDateofadmission(e.target.value)} className="input"
                    value={dateofadmission} type="text" />

                <label className="label">Dateofdischarge</label>
                <input onChange={(e) => setDateofdischarge(e.target.value)} className="input"
                    value={dateofdischarge} type="number" />

                     <label className="label">Providername</label>
                <input onChange={(e) => setProvidername(e.target.value)} className="input"
                    value={providername} type="providername" /> <br/>

                <label className="label">Totalbillamount</label>
                <input onChange={(e) => setTotalbillamount(e.target.value)} className="input"
                    value={totalbillamount} type="number" />

                <div>
                    <button id="submit" type="button" disabled={!validateForm()} onClick={() => { sendRegistrationRequest() }} >
                        Submit </button>
                </div>
            </form>
        </div>
    </>
)
}

export default Claims;


