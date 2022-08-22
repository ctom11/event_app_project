import React from "react";
import './Userprofile.css';
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Axios from 'axios';

export const DeleteAccount = () => {

    let navigate = useNavigate();
    let { id } = useParams();

    const deleteAccount = () => {
        Axios.delete(`http://localhost:3001/useraccount/deleteaccount/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((Response) => {
            if (Response.data.error) {
              alert(Response.data.error);
            } else {
              console.log(Response.data);
              localStorage.removeItem("accessToken");
              navigate(`/`);
            }
            window.location.reload();
        });
    };

    return (

            <Card className="delete-account-div">
                <h1 className="delete-account-header">Are you sure you want to delete your account?</h1>  
                <h2 className="delete-account-h2">We're sad to see you go ☹</h2>
                <div className="delete-account-btns">
                    <Button className="delete-account-btn" onClick={deleteAccount}>Yes</Button>
                    <Button className="delete-account-btn" onClick={() => {navigate(`/userprofile/${id}`)}}>No</Button>
                </div>
            </Card> 

    )

}