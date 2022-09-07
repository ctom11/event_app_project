import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import Pdf from '../../assets/EventureTermsConditions.pdf';

export const Signup = () => {

    useEffect(() => {
        document.title = 'Sign Up - Eventure';
    });

    /*set up for connecting to individual event page*/
    let navigate = useNavigate()

    /*have to create initial values for Formik*/
    const initialValues = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        tandc : false,
    }

    /*provides validation on form input*/
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().max(100).required().label("First name"), //Event name must be a string, max 100 chars and is required
        lastName: Yup.string().max(250).required().label("Last name"), //Event description must be a string, max 250 chars and is required
        emailAddress: Yup.string().email('invalid email').required().label("Email"), //date is required
        password: Yup.string().min(8).max(30).required().label("Password"), //Event time must be a string and is required
        confirmPassword: Yup.string().required().label("Password").oneOf([Yup.ref('password'), null], 'Passwords must match'),//Location must be a string and is required
        tandc: Yup.boolean().oneOf([true], "You must accept the terms and conditions")
    })

    const submitRegister = (data) => {
        Axios.post('http://localhost:3001/signup', data).then(() => {
            console.log(data)
            alert("Registration successful!")
            navigate(`/login`);
            window.location.reload();
        });         
    };

    return (

    <div className="card signup-card">
        <div className="card-body">
            <h5 className="card-title signup-title">Sign Up</h5>
            <Formik initialValues={initialValues} onSubmit={submitRegister} validationSchema={validationSchema}>
                <Form className="signup-form">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputFirstName">First Name</label><br/>
                            <ErrorMessage name="firstName" component="span"/>
                            <Field type="text" className="form-control form-input-signup signup" id="inputFirstName" name="firstName" placeholder="First Name"></Field>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputLastName">Last Name</label><br/>
                            <ErrorMessage name="lastName" component="span"/>
                            <Field type="text" className="form-control form-input-signup signup" id="inputLastName" name="lastName" placeholder="Last Name"></Field>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail4">Email</label><br/>
                            <ErrorMessage name="emailAddress" component="span"/>
                            <Field type="email" className="form-control form-input-signup signup" id="inputEmail4" name="emailAddress" placeholder="Email"></Field>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword4">Password</label><br/>
                            <ErrorMessage name="password" component="span"/>
                            <Field type="password" className="form-control form-input-signup signup" id="inputPassword4" name="password" placeholder="Password"></Field>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputConfirmPassword4">Confirm Password</label><br/>
                            <ErrorMessage name="confirmPassword" component="span"/>
                            <Field type="password" className="form-control form-input-signup signup" id="inputConfirmPassword4" name="confirmPassword" placeholder="Confirm Password"></Field>
                        </div>
                        <div className="form-group">
                            <div>
                                <a href = {Pdf} target = "_blank" className='tandc'>View Terms and Conditions</a>
                            </div>
                            <div className="form-check">
                                <Field className="form-check-input" name="tandc" type="checkbox" id="tandc"></Field>
                                <label className="form-check-label" htmlFor="gridCheck">
                                I agree to Eventure's Terms and Conditions
                                </label><br/>
                                <ErrorMessage name="tandc" component="span"/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary eventure-btn" onClick={submitRegister}>Register</button>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>

    ) 
};