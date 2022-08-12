import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Axios from 'axios';
import './Userprofile.css';

export const ChangeName = () => {

    let navigate = useNavigate()

    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    let { id } = useParams();

    const changeName = () => {
        Axios.post(`http://localhost:3001/useraccount/changename/${id}`, {
            updatedFirstName: newFirstName, updatedLastName: newLastName},
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        ).then((Response) => {
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
            <div className="mb-3">
                <label htmlFor="inputfirstname" className="form-label change-label">First Name:</label>
                <input type="text" className="form-control login change-input" id="inputfirstname"
                onChange={(e) => {setNewFirstName(e.target.value);}}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputlastname" className="form-label change-label">Last Name:</label>
                <input type="text" className="form-control login change-input" id="inputlastname"
                onChange={(e) => {setNewLastName(e.target.value);}}></input>
            </div>
            <button type="submit" className="btn btn-primary eventure-btn change-btn" onClick={changeName}>Save</button>
        </Card> 
    )

}