import React, { useState, useEffect } from "react";
import './Userprofile.css';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from "react-bootstrap";
import TestImage from '../../assets/images/profile-pic-logo.png';
import { useParams } from "react-router-dom";
import Axios from 'axios';

export const Userprofile = () => {

  let { id } = useParams();
  const [userObject, setUserObject] = useState({});
  
  useEffect(() => {
      Axios.get(`http://localhost:3001/useraccount/byId/${id}`, {headers: {accessToken: sessionStorage.getItem("accessToken")}, }) .then((Response) => {
          console.log(Response)
          setUserObject(Response.data);
      });
  }, [])

  const UpdateProfilePicture = () => {
      Axios.post('http://localhost:3001/updateprofilepic', {
          userProfilePicture: userObject.user_profile_picture, userAccountId: userObject.user_account_id
      }).then(() => {
          alert("profile picture successfully updated");
      });
  };

  return (

    <Row xs={1} md={1} className="g-4">
      <Col className="col-md-3">
        <Card>
          <Card.Img className="profile-picture" variant="top" src={TestImage} />
          <Card.Body>
            <Card.Title className="profile-title">Card title</Card.Title>
            <button type="submit" className="btn btn-primary signup-button" onClick={UpdateProfilePicture}>Update Profile Picture</button>
            <Card.Text className="profile-text">
              <p>{userObject.first_name} {userObject.last_name}
              {userObject.email_address}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-md-9">
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title className="profile-title">Card title</Card.Title>
            <Card.Text className="profile-text">
              Here will be information on events user is interested and going to.
            </Card.Text>
            <Card.Title className="profile-title">Card title</Card.Title>
            <Card.Text className="profile-text">
              Here will be information on events user is interested and going to.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title className="profile-title">Posted Events</Card.Title>
            <Card.Text className="profile-text">
              Here will be information on user's own events.
            </Card.Text>
              <Link to="/CreateEvent">
                <Button variant="primary">Create Event</Button>
              </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>

  )
}