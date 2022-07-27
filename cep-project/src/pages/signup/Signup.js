import React, { useState } from "react";
import './Signup.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from 'axios';

export const Signup = () => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email_address, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    

    /*have to create initial values for Formik*/
    const initialValues = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    }

    /*provides validation on form input*/
    const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(100).required, //Event name must be a string, max 100 chars and is required
    lastName: Yup.string().max(250).required, //Event description must be a string, max 250 chars and is required
    emailAddress: Yup.date().required, //date is required
    password: Yup.string().required, //Event time must be a string and is required
    confirmPassword: Yup.string().required, //Event location must be a string and is required
})

const onSubmit = (data) => {
    console.log(data);
}



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
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <form className="signup-form">
        <div className="row">
            <div className="form-group col-md-6">
                <label htmlFor="inputFirstName">First Name</label>
                <ErrorMessage name="firstName" component="span"/>
                <input type="text" className="form-control form-input-signup signup" id="inputFirstName" placeholder="First Name"
                onChange={(e) => {
                    setFirstName(e.target.value);
                }}></input>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputLastName">Last Name</label>
                <ErrorMessage name="lastName" component="span"/>
                <input type="text" className="form-control form-input-signup signup" id="inputLastName" placeholder="Last Name"
                onChange={(e) => {
                    setLastName(e.target.value);
                }}></input>
            </div>
            <div className="form-group">
                <label htmlFor="inputEmail4">Email</label>
                <ErrorMessage name="emailAddress" component="span"/>
                <input type="email" className="form-control form-input-signup signup" id="inputEmail4" placeholder="Email"
                onChange={(e) => {
                    setEmailAddress(e.target.value);
                }}></input>
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword4">Password</label>
                <ErrorMessage name="password" component="span"/>
                <input type="password" className="form-control form-input-signup signup" id="inputPassword4" placeholder="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}></input>
            </div>
            <div className="form-group">
                <label htmlFor="inputConfirmPassword4">Confirm Password</label>
                <ErrorMessage name="confirmPassword" component="span"/>
                <input type="password" className="form-control form-input-signup signup" id="inputConfirmPassword4" placeholder="Confirm Password"
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
            <button type="submit" className="btn btn-primary form-button" onClick={SubmitRegister}>Register</button>
        </div>
        </form>
        </Formik>
    </div>
</div>

) 
};