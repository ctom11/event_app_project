import React, { useState, useEffect } from "react";
import './Userprofile.css';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from "react-bootstrap";
import Moment from "moment";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TestImage from '../../assets/images/profile-pic-logo.png';
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';


export const Userprofile = () => {

  //set up for connecting to individual event page
  let navigate = useNavigate()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { id } = useParams();
  const [userObject, setUserObject] = useState({});
  const [myEventsObject, setMyEventsObject] = useState([]);
  
  //get all user info
  useEffect(() => {
      Axios.get(`http://localhost:3001/useraccount/byId/${id}`, {
        headers: {accessToken: localStorage.getItem("accessToken")}, 
      }) .then((Response) => {
          console.log(Response)
          setUserObject(Response.data);
      });
  }, [])

  //find out if user is an admin
  let adminTaskLink = ""
  let adminStatus = 0;
  if (userObject.admin_status = 1) {
    adminStatus = 1
  }
  if (adminStatus = 1) {
    adminTaskLink = <Button>View Admin Tasks</Button>
  } else {
    adminTaskLink = null
  }

  //update user profile picture
  const UpdateProfilePicture = () => {
      Axios.post(`http://localhost:3001/updateprofilepic/${id}`,{
        headers: {accessToken: localStorage.getItem("accessToken")}, 
      }, {
          userProfilePicture: userObject.user_profile_picture
      }).then(() => {
          alert("profile picture successfully updated");
      });
  };

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
      alert("bio successfully updated" + userBio);
      window.location.reload();
      }
    });
  };

  //get list of user's events they are interested in
  useEffect(() => {
    Axios.get(`http://localhost:3001/useraccount/myevents/${id}`, {
      headers: {accessToken: localStorage.getItem("accessToken")}, 
    }) .then((Response) => {
        console.log(Response)
        setMyEventsObject(Response.data);
    });
  }, [])

  //set default profile picture
  let profilePicture = TestImage;
  if (userObject.user_profile_picture) {
    profilePicture = userObject.user_profile_picture
  }
  const changepicpopover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <form action="/" enctype="multipart/form-data" method="post">
          <input type="file" name="image" accept='image/*' />
          <input type="submit" value="Upload"/>
        </form>
      </Popover.Body>
    </Popover>
  );

  //show bio text box only if user has not added a bio yet
  let bioDisplay =  <div>
                      <h2 className="update-bio">Update your account bio:</h2>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Start typing..." onChange={(e) => {setUserBio(e.target.value)}}></textarea>
                      <button className="add-comment-btn" onClick={UpdateBio}>Add Bio</button>
                    </div>
  if (userObject.user_bio) {
    bioDisplay = <div className="user-bio">{userObject.user_bio}</div>
  }

  //logout shortcut
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/")
    window.location.reload();
  }

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
                {bioDisplay}
              </Card.Text>
              
              <Button className="account-settings-btn" variant="primary" onClick={handleShow}>Account Settings</Button>
              <Button className="account-settings-btn" variant="primary" onClick={logout}>Logout</Button>

              <Offcanvas show={show} onHide={handleClose} className="account-settings-offcanvas">
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body className="account-settings-body">
                  <h1>Account Settings</h1>
                  <div className="account-settings-options">
                    <h2 className="settings-option" onClick={() => {navigate(`/changename/${userObject.user_account_id}`)}}>Change My Name</h2>
                    <h2 className="settings-option" onClick={() => {navigate(`/changepassword/${userObject.user_account_id}`)}}>Change My Password</h2>
                    <h2 className="settings-option" onClick={() => {navigate(`/deleteaccount/${userObject.user_account_id}`)}}>Delete My Account</h2>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
    
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-md-9 profile-right">
          <Card className="interested-card">
            <Card.Body>
              <Card.Title className="profile-title">Events you're interested in..</Card.Title>

              <div xs={1} md={3} className="row g-4">
                {myEventsObject.map((value, key) => { 
                  return(               
                    <div className="row interested-event-info" onClick={() => {navigate(`/event/${value.event_id}`)}}>
                      <p><b>{value.event_name}</b> {Moment(value.event_date).format("Do MMMM YYYY")} {value.event_time}</p>  
                    </div>
                  )
                })}
              </div>
            </Card.Body>
          </Card>
          <Card>
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