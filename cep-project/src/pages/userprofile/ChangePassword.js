import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card } from "react-bootstrap";
import Axios from 'axios';
import './Userprofile.css';

export const ChangePassword = () => {

    useEffect(() => {
        document.title = 'Change Your Password - Eventure';
      });

    let navigate = useNavigate()

    /*have to create initial values for Formik*/
    const initialValues = {
        updatedPassword: "",
        updatedPasswordReenter: ""
    }

    /*provides validation on form input*/
    const validationSchema = Yup.object().shape({  
    updatedPassword: Yup.string().min(8).max(30).required().label("Password"), //Event time must be a string and is required
    updatedPasswordReenter: Yup.string().required().label("Password").oneOf([Yup.ref('updatedPassword'), null], 'Passwords must match'),//Event location must be a string and is required
    })


    let { id } = useParams();

    const changePassword = (data) => {
        Axios.post(`http://localhost:3001/useraccount/changepassword/${id}`, data,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((Response) => {
            if (Response.data.error) {
              alert(Response.data.error);
            } else {
              console.log(Response.data);
              alert("Password successfully changed")
              navigate(`/userprofile/${id}`);
            }
            window.location.reload();
        });
    };

    return (

        <Card className="change-name-div">
            <h1 className="change-title-password">Change Your Password</h1>

            <Formik initialValues={initialValues} onSubmit={changePassword} validationSchema={validationSchema}>
                <Form>
                    <div className="mb-3 change-label-input">
                        <label className="form-label change-label">New Password</label><br/>
                        <br/>
                        <ErrorMessage name="updatedPassword" component="span"/>
                        <Field type="password" className="form-control login change-input" name="updatedPassword" id="updatedPassword"></Field>
                    </div>
                    <div className="mb-3 change-label-input">
                        <label className="form-label change-label">Re-enter Password:</label><br/>
                        <br/>
                        <ErrorMessage name="updatedPasswordReenter" component="span"/>
                        <Field type="password" className="form-control login change-input" name="updatedPasswordReenter" id="updatedPasswordReenter"></Field>
                    </div>
                    <div className="change-options">
                        <button className="btn btn-primary eventure-btn change-btn" onClick={() => {navigate(`/userprofile/${id}`)}}>Cancel</button>
                        <button type="submit" className="btn btn-primary eventure-btn change-btn" onClick={changePassword}>Save</button>
                    </div>
                </Form>
            </Formik>

        </Card> 
    )

}