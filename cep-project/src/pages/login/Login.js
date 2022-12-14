import React, { useState, useContext, useEffect } from "react";
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import LoginArt from '../../assets/images/loginart.png';
import Axios from 'axios';
import { AuthContext } from '../../components/AuthContext'; 

export const Login = () => {

  useEffect(() => {
    document.title = 'Login - Eventure';
  });

  const [email_address, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthState } = useContext(AuthContext)

  /*set up for connecting to individual event page*/
  let navigate = useNavigate()
  
  const login = () => {
    Axios.post('http://localhost:3001/login', {
      emailAddress: email_address, password: password
    }).then((Response) => {
      if (Response.data.error) {
        alert(Response.data.error);
      } else {
        console.log(Response.data);
        localStorage.setItem("accessToken", Response.data.token);
        setAuthState({
          firstName: Response.data.firstName, 
          id: Response.data.id, 
          adminStatus: Response.data.adminStatus
        })
        navigate(`/userprofile/${Response.data.id}`);
      }
        window.location.reload();
    });
  };

  return (

    <div className="card mb-3 login-card" style={{ maxWidth: 1000 }}>
      <div className="row g-0">
        {/*image beside login form*/}
        <div className="col-md-7">
          <img src={LoginArt} className="img-fluid rounded-start"></img>
          <h2>Don't have an account yet? <Link to="/Signup" className="reg-link"><i>Sign up here.</i></Link></h2>
        </div>
        {/*login form*/}
        <div className="col-md-5">          
          <div className="card-body">
            <div className="mb-3">
              <br/>
              <h1 className="SignIn-header">Sign In</h1>
              <label htmlFor="inputemail" className="form-label">Email address</label>
              <input type="email" className="form-control login" id="inputemail" aria-describedby="emailHelp"
              onChange={(e) => {
                setEmailAddress(e.target.value);
              }}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputpassword" className="form-label">Password</label>
              <input type="password" className="form-control login" id="inputpassword"
              onChange={(e) => {
                setPassword(e.target.value);
              }}></input>
            </div>
            <div>
              <a href = "/forgotpassword" target = "_blank" className='tandc'>I forgot my password</a>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary eventure-btn" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>

) 
};