import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Axios from 'axios';
import './Userprofile.css';

export const UpdateProfilePicture = () => {

    let navigate = useNavigate()
    let { id } = useParams();

    //update user profile picture
    const [userProfilePicture, setUserProfilePicture] = useState("");
    const UpdateProfilePicture = () => {
        Axios.post(`http://localhost:3001/useraccount/updateprofilepic/${id}`, {
            userProfilePicture: userProfilePicture},
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
            <h1 className="change-title">Update Your Profile Picture</h1>
            <div className="mb-3">
                <label htmlFor="inputBio" className="form-label change-label">Choose File:</label>
                <input type="text" className="form-control login change-input" id="inputBio"
                onChange={(e) => {setUserProfilePicture(e.target.value);}}></input>
            </div>
            <button type="submit" className="btn btn-primary eventure-btn change-btn" onClick={UpdateProfilePicture}>Save</button>
        </Card> 
    )

}