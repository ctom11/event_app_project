import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Axios from 'axios';
import './Userprofile.css';

export const UpdateBio = () => {

    let navigate = useNavigate()
    let { id } = useParams();

    //update user bio
    const [userBio, setUserBio] = useState("");
    const UpdateBio = () => {
        Axios.post(`http://localhost:3001/useraccount/updatebio/${id}`, {
        userBio: userBio },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((Response) => {
            if (Response.data.error) {
                alert(Response.data.error);
            } else {
                navigate(`/userprofile/${id}`)
            }
        });
    };

    return (

        <Card className="change-name-div">
            <h1 className="change-title">Update Your Bio</h1>
            <div className="mb-3">
                <label htmlFor="inputBio" className="form-label change-label">Enter a new user bio (max. 500 characters)</label>
                <textarea type="text" rows="4" className="form-control login change-input" id="inputBio"
                onChange={(e) => {setUserBio(e.target.value);}}></textarea>
            </div>
            <button type="submit" className="btn btn-primary eventure-btn change-btn" onClick={UpdateBio}>Save</button>
        </Card> 
    )

}