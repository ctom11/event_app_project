import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Axios from 'axios';
import './Userprofile.css';

export const ChangePassword = () => {

    let navigate = useNavigate()

    const [newPassword, setNewPassword] = useState('')
    let { id } = useParams();

    const changePassword = () => {
        Axios.post(`http://localhost:3001/useraccount/changepassword/${id}`, {
            updatedPassword: newPassword},
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
            <h1 className="change-title-password">Change Your Password</h1>
            <div className="mb-3">
                <label htmlFor="inputcurrentpassword" className="form-label change-label">Current Password</label>
                <input type="password" className="form-control login change-input" id="inputcurrentpassword"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputcurrentpassword" className="form-label change-label">New Password</label>
                <input type="password" className="form-control login change-input" id="inputcurrentpassword"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputreenterpassword" className="form-label change-label">Re-enter Password:</label>
                <input type="password" className="form-control login change-input" id="inputreenterpassword"></input>
            </div>
            <button type="submit" className="btn btn-primary eventure-btn change-btn" onClick={changePassword}>Save</button>
        </Card> 
    )

}