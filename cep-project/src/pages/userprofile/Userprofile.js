import React, { useState, useEffect } from "react";
import './Userprofile.css';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TestImage from '../../assets/images/profile-pic-logo.png';
import { useParams } from "react-router-dom";
import Axios from 'axios';

export const Userprofile = () => {

  const accessToken = localStorage.getItem("accessToken");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { id } = useParams();
  const [userObject, setUserObject] = useState({});
  
  useEffect(() => {
      Axios.get(`http://localhost:3001/useraccount/byId/${id}`, {
        headers: {accessToken: localStorage.getItem("accessToken")}, 
      }) .then((Response) => {
          console.log(Response)
          setUserObject(Response.data);
      });
  }, [])

  const UpdateProfilePicture = () => {
      Axios.post(`http://localhost:3001/updateprofilepic/${id}`,{
        headers: {accessToken: localStorage.getItem("accessToken")}, 
      }, {
          userProfilePicture: userObject.user_profile_picture
      }).then(() => {
          alert("profile picture successfully updated");
      });
  };

  let profilePicture = {TestImage};
  if (userObject.user_profile_picture != null) {
    profilePicture = userObject.user_profile_picture
  }


  const changepicpopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        <form action="/" enctype="multipart/form-data" method="post">
          <input type="file" name="image" accept='image/*' />
          <input type="submit" value="Upload"/>
        </form>
      </Popover.Body>
    </Popover>
  );

  return (

    <div className="profile-page-full">
      <Row xs={1} md={1} className="g-4">
        <Col className="col-md-3 profile-left">
          <Card>
            <Card.Img className="profile-picture" variant="top" src={profilePicture} />

            <OverlayTrigger trigger="click" placement="right" overlay={changepicpopover}>
              <Button variant="success" type="submit" className="btn btn-primary change-prof-pic" onClick={UpdateProfilePicture}>Update Profile Picture</Button>
            </OverlayTrigger>

            <Card.Body className="profile-user-details">
              <Card.Text className="profile-text">
                <p className="user-name-profile">{userObject.first_name} {userObject.last_name}</p>
                <p>{userObject.email_address}</p>
              </Card.Text>
              
              <Button className="account-settings-btn" variant="primary" onClick={handleShow}>Account Settings</Button>
              <Button className="account-settings-btn" variant="primary" onClick={handleShow}>Logout</Button>

              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="account-settings-body">
                  <h1>Account Settings</h1>
                  <div className="account-settings-option">
                  <h2>Change my name</h2>
                  <h2>Change my password</h2>
                  <h2>Delete my account</h2>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
    
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-md-9 profile-right">
          <Card>
            <Card.Body>
              <Card.Title className="profile-title">Events you're interested in..</Card.Title>
                
                <Row xs={1} md={3} className="g-4">
                  <Col>
                  </Col>
                </Row>

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
    </div>

  )
}