import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Axios from 'axios';
import './Userprofile.css';

export const UpdateProfilePicture = () => {

    const [image, setImage] = useState({ preview: '', data: '' })

    const handleImageChange = (e) => {
        const img = {
        preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImage(img)
    }

    useEffect(() => {
        document.title = 'Update Your Profile Picture - Eventure';
      });

    let navigate = useNavigate()
    let { id } = useParams();

    //update user profile picture
    const UpdateProfilePicture = () => {

        let formData = new FormData();
        formData.append('userProfilePicture', image.data);

        Axios.post(`http://localhost:3001/useraccount/updateprofilepic/${id}`, formData, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
                "Content-Type": "multipart/form-data"
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
            <div>
                <label htmlFor="inputUserImg" className="create-label">Image</label><br/>
                <input type="file" onChange={handleImageChange} id="input-user-image" className="form-input-signup signup create-input" name="userimage"></input>
            </div>
            <div className="change-options">
                <button className="btn btn-primary eventure-btn change-btn" onClick={() => {navigate(`/userprofile/${id}`)}}>Cancel</button>
                <button type="submit" className="btn btn-primary eventure-btn change-btn" onClick={UpdateProfilePicture}>Save</button>
            </div>
        </Card> 
    )

}