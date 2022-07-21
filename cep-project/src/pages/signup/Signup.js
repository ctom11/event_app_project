import React, { useState } from "react";
import './Signup.css';
import Axios from 'axios';

export const Signup = () => {

const [first_name, setFirstName] = useState('')
const [last_name, setLastName] = useState('')
const [email_address, setEmailAddress] = useState('')
const [password, setPassword] = useState('')
const [confirm_password, setConfirmPassword] = useState('')

const SubmitRegister = () => {
    Axios.post('http://localhost:3001/signup', {
        firstName: first_name, lastName: last_name, emailAddress: email_address, password: password, confirmPassword: confirm_password
    }).then(() => {
        alert("successful register");
    });
};

return (

<div className="card signup-card">
    <div className="card-body">
        <h5 className="card-title signup-title">Sign Up</h5>
        <form className="signup-form">
        <div className="row">
            <div className="form-group col-md-6">
                <label htmlFor="inputFirstName">First Name</label>
                <input type="text" className="form-control form-input-signup" id="inputFirstName" placeholder="First Name"
                onChange={(e) => {
                    setFirstName(e.target.value);
                }}></input>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputLastName">Last Name</label>
                <input type="text" className="form-control form-input-signup" id="inputLastName" placeholder="Last Name"
                onChange={(e) => {
                    setLastName(e.target.value);
                }}></input>
            </div>
            <div className="form-group">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="form-control form-input-signup" id="inputEmail4" placeholder="Email"
                onChange={(e) => {
                    setEmailAddress(e.target.value);
                }}></input>
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword4">Password</label>
                <input type="password" className="form-control form-input-signup" id="inputPassword4" placeholder="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}></input>
            </div>
            <div className="form-group">
                <label htmlFor="inputConfirmPassword4">Confirm Password</label>
                <input type="password" className="form-control form-input-signup" id="inputConfirmPassword4" placeholder="Confirm Password"
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}></input>
            </div>
            <div className="form-group">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"></input>
                    <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                    </label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary signup-button" onClick={SubmitRegister}>Register</button>
        </div>
        </form>
    </div>
</div>

) 
};