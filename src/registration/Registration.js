import React, { useState } from "react";
import { useHistory } from "react-router";

const Registration = () => {

    let history = useHistory();
    // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [contactno, setContactno] = useState('');
    const [pancard, setPancard] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const[dob,setDob]=useState('');

    function validateForm() {
        return username.length > 0 && password.length > 0 && email.length > 0 && name.length > 0 &&
            contactno.length > 0 && state.length > 0 && country.length > 0 && address.length > 0
            && dob.length > 0;
    }

    async function sendRegistrationRequest() {
        console.log("I am sending a request:");
        const reqBody = {
            username: username,
            password: password,
            name: name,
            email: email,
            dob:dob,
            pancard: pancard,
            contactno: contactno,
            address: address,
            state: state,
            country: country,
        };
        try {
            await fetch("http://localhost:8081/memberRegPortal/registerMemberPortalDetails", {
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
                    alert("Member Registration was successful.");
                    history.push("/login")
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
                        <h1>Member Registration Portal</h1>
                    </center>
                </div>

                <form>
                    {/* Labels and inputs for form data */}
                    <label className="label">Name</label>
                    <input onChange={(e) => setName(e.target.value)} className="input"
                        value={name} type="text" />

                    <label className="label">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="input"
                        value={email} type="email" />

                    <label className="label">Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} className="input"
                        value={username} type="username" /> <br />

                    <label className="label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="input"
                        value={password} type="text" />

                    <label className="label">Contactno</label>
                    <input onChange={(e) => setContactno(e.target.value)} className="input"
                        value={contactno} type="number" />

                    <label className="label">Dob</label>
                    <input onChange={(e) => setDob(e.target.value)} className="input"
                        value={dob} type="number" />

                    <label className="label">Pancard</label>
                    <input onChange={(e) => setPancard(e.target.value)} className="input"
                        value={pancard} type="pancard" /> <br />

                    <label className="label">Address</label>
                    <input onChange={(e) => setAddress(e.target.value)} className="input"
                        value={address} type="address" />

                    <label className="label">State</label>
                    <input onChange={(e) => setState(e.target.value)} className="input"
                        value={state} type="state" />

                    <label className="label">Country</label>
                    <input onChange={(e) => setCountry(e.target.value)} className="input"
                        value={country} type="country" /> <br />

                    <div>
                        <button id="submit" type="button" disabled={!validateForm()} onClick={() => { sendRegistrationRequest() }} >
                            Submit </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Registration;
