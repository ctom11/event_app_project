import React, { useState } from "react";
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import LoginArt from '../../assets/images/loginart.png';
import Axios from 'axios';

export const Login = () => {

  const [email_address, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const [loginStatus, setLoginStatus] = useState("")

  /*have to create initial values for Formik*/
  const initialValues = {
    email: "",
    password: "",
  }

  /*provides validation on form input*/
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required, //Email must be a string and is required
    password: Yup.string().min(8).max(30).required, //Event description must be a string, max 250 chars and is required
  })

  const onSubmit = (data) => {
    console.log(data);
  }
  
  const login = () => {
      Axios.post('http://localhost:3001/login', {
          emailAddress: email_address, password: password
      }).then((response) => {

          if (response.data.message) {
            setLoginStatus(response.data.message)
          } else {
            setLoginStatus(response.data[0].emailAddress)
          }
      });
  };

  return (

    <div className="card mb-3 login-card" style={{ maxWidth: 1000 }}>
      <div className="row g-0">
        {/*image beside login form*/}
        <div className="col-md-7">
          <img src={LoginArt} className="img-fluid rounded-start"></img>
          <h2>Don't have an account yet? <Link to="/Signup"><i>Sign up here.</i></Link></h2>
        </div>
        {/*login form*/}
        <div className="col-md-5">          
          <div className="card-body">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <form>
                <div className="mb-3">
                  <h1 className="SignIn-header">Sign In</h1>
                  <label htmlFor="inputemail" className="form-label">Email address</label>
                  <ErrorMessage name="email" component="span"/>
                  <input type="email" className="form-control login" id="inputemail" aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                  }}></input>
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputpassword" className="form-label">Password</label>
                  <ErrorMessage name="password" component="span"/>
                  <input type="password" className="form-control login" id="inputpassword"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}></input>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Keep me logged in</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
              </form>
            </Formik>
          </div>
          <h1>{loginStatus}</h1>
        </div>
      </div>
    </div>

) 
};