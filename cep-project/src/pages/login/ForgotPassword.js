import React, { useEffect, useState } from 'react';
import '../event/CreateEvent.css';
import './Login.css';
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import '../event/Event.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {

    let navigate = useNavigate();

    const [emailId, setEmailId] = useState('');

    const ResetPassword = () => {
        Axios.post(`http://localhost:3001/forgotpassword` , {
            headers: {accessToken: localStorage.getItem("accessToken")},
            emailId: emailId,
        }).then((Response) => {
            if (Response.data.error) {
              alert(Response.data.error);
            } else {
              console.log(Response.data);
              navigate('/passwordisreset');
            }
        });
    }

    useEffect(() => {
        document.title = "Reset Password - Eventure";
      });
  
    return (

        <Card className="create-event">
            <h1 className='create-event-header'>Forgotten your password?</h1>
            <h2 className='create-event-h2 forgotten-pw'>Don't panic! Just enter your email address here and we can send you an email with a new password. We do recommend that you change this password as soon as you login again!</h2>
            
            <div>
                <label className="create-label input-pw-email">email address</label>
                <input type="email" className="form-input-signup signup create-input long-input"
                onChange={(e) => {
                    setEmailId(e.target.value);
                }}></input>
            </div>
            <button type="submit" className="btn btn-primary eventure-btn create-event-btn" onClick={ResetPassword}>Reset Password</button>
        </Card>

    )
}