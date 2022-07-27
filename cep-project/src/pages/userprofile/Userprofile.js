import React, { useState } from "react";
import './Userprofile.css';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from "react-bootstrap";
import TestImage from '../../assets/images/profile-pic-logo.png';
import Axios from 'axios';

export const Userprofile = () => {

  const [user_profile_picture, setUserProfilePicture] = useState('')
  const [user_account_id, setUserAccountId] = useState('')
  
  const UpdateProfilePicture = () => {
      Axios.post('http://localhost:3001/updateprofilepic', {
          userProfilePicture: user_profile_picture, userAccountId: user_account_id
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
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
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