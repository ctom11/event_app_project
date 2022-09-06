import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card } from "react-bootstrap";
import Axios from 'axios';
import './Userprofile.css';

export const ChangeName = () => {

    useEffect(() => {
        document.title = 'Change Your Name - Eventure';
      });

    let navigate = useNavigate()
    

    /*have to create initial values for Formik*/
    const initialValues = {
        newFirstName: "",
        newLastName: ""
    }
    
    /*provides validation on form input*/
    const validationSchema = Yup.object().shape({  
        newFirstName: Yup.string().max(255).required().label("First name"), //Name must be a string and is required
        newLastName: Yup.string().max(255).required().label("Last name"), //Name must be a string and is required
        })

    let { id } = useParams();

    const changeName = (data) => {
        Axios.post(`http://localhost:3001/useraccount/changename/${id}`, data,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
            }).then((Response) => {
            if (Response.data.error) {
              alert(Response.data.error);
            } else {
              console.log(Response.data);
              navigate(`/userprofile/${id}`);
            }
            window.location.reload();
        });
    };

    return (

        <Card className="change-name-div">
            <h1 className="change-title">Change Your Name</h1>
            <h2 className="change-title">Please specify your updated first and last name:</h2>
            <Formik initialValues={initialValues} onSubmit={changeName} validationSchema={validationSchema}>
                <Form>
                    <div className="mb-3">
                        <label htmlFor="newFirstName" className="form-label change-label">First Name:</label>
                        <br/>
                        <ErrorMessage name="newFirstName" component="span"/>
                        <Field type="text" className="form-control login change-input" id="newFirstName" name="newFirstName"></Field>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newLastName" className="form-label change-label">Last Name:</label>
                        <br/>
                        <ErrorMessage name="newLastName" component="span"/>
                        <Field type="text" className="form-control login change-input" id="newLastName" name="newLastName"></Field>
                    </div>
                    <div className="change-options">
                        <button className="btn btn-primary eventure-btn change-btn" onClick={() => {navigate(`/userprofile/${id}`)}}>Cancel</button>
                        <button type="submit" className="btn btn-primary eventure-btn change-btn" onClick={changeName}>Save</button>
                    </div>
                </Form>
            </Formik>
        </Card> 
    )

}