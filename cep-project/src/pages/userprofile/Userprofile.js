import React, { useState, useEffect } from "react";
import './Userprofile.css';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Moment from "moment";
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
  //user's account information
  const [userObject, setUserObject] = useState({});
  //events user is interested in
  const [myEventsObject, setMyEventsObject] = useState([]);
  //events user has posted
  const [postedEventsObject, setPostedEventsObject] = useState([]);
  
  //get all user info
  useEffect(() => {
      Axios.get(`http://localhost:3001/useraccount/byId/${id}`, {
        headers: {accessToken: localStorage.getItem("accessToken")}, 
      }) .then((Response) => {
          console.log(Response)
          setUserObject(Response.data);
      });
  }, [])

  useEffect(() => {
    document.title = `${userObject.first_name} ${userObject.last_name} - Eventure`;
  });

  //find out if user is an admin
  let adminStatus = userObject.admin_status;
  let adminTaskLink = <></>
  if (adminStatus === 1) {
    adminTaskLink = <Button className="admin-tasks-btn" onClick={() => {navigate(`/admintasks/${id}`)}}>View My Admin Tasks</Button>
  } else {  
    adminTaskLink = null
  }

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

  //get list of user's events they have posted
  useEffect(() => {
    Axios.get(`http://localhost:3001/useraccount/postedevents/${id}`, {
      headers: {accessToken: localStorage.getItem("accessToken")}, 
    }) .then((Response) => {
        console.log(Response)
        setPostedEventsObject(Response.data);
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

  //show my events only if there are any
  let displayMyEvents =  <h2 className="nothing-to-show">You haven't added any events yet</h2>
  if (myEventsObject.length >0) {
    displayMyEvents = <Carousel slide={false} className="event-carousel">
    {myEventsObject.map((value, key) => { 
      return(    
        <Carousel.Item  onClick={() => {navigate(`/event/${value.event_id}`)}}>
          <img className="d-block w-100 event-carousel-img" src={value.event_img} alt="First slide"/>
          <Carousel.Caption>
            <h3 className="event-carousel-h3">{value.event_name}</h3>
            <p className="event-carousel-p">{Moment(value.event_date).format("Do MMMM YYYY")} {value.event_time}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )
    })}
  </Carousel>
  }

  //show created events only if there are any
  let displayCreatedEvents =  <h2 className="nothing-to-show">You haven't created any events yet</h2>
  if (postedEventsObject.length >0) {
    displayCreatedEvents = <Carousel slide={false} className="event-carousel">
    {postedEventsObject.map((value, key) => { 
      return(    
        <Carousel.Item>
          <img className="d-block w-100 event-carousel-img" src={value.event_img} alt="First slide"  onClick={() => {navigate(`/event/${value.event_id}`)}}/>
          <Carousel.Caption>
            <h3 className="event-carousel-h3">{value.event_name}</h3>
            <p className="event-carousel-p">{Moment(value.event_date).format("Do MMMM YYYY")} {value.event_time}</p>
            <Link to={`/DeleteEvent/${value.event_id}`}><Button className="profile-create-event-btn">Delete This Event</Button></Link>
          </Carousel.Caption>
        </Carousel.Item>
      )
    })} 
  </Carousel>
    }


  //logout shortcut
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/")
    window.location.reload();
  }

  return (

    <div className="profile-page-full">
      <Row xs={1} md={1} className="g-4 profile-row">
        <Col className="col-md-4 profile-left">
          <Card className="profile-left-info">
            <Card.Img className="profile-picture" variant="top" src={profilePicture} />
            <Card.Body className="profile-user-details">
              <Card.Text className="profile-text">
                <p className="user-name-profile">{userObject.first_name} {userObject.last_name}</p>
                <p className="profile-email">{userObject.email_address}</p>
                {bioDisplay}
              </Card.Text>
              {adminTaskLink}<br/>
              
              <Button className="account-settings-btn" variant="primary" onClick={handleShow}>Account Settings</Button>
              <Button className="account-settings-btn" variant="primary" onClick={logout}>Logout</Button>

              <Offcanvas show={show} onHide={handleClose} className="account-settings-offcanvas">
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body className="account-settings-body">
                  <h1>Account Settings</h1>
                  <div className="account-settings-options">
                    <h2 className="settings-option" onClick={() => {navigate(`/updateprofilepic/${userObject.user_account_id}`)}}>Update Profile Picture</h2>
                    <h2 className="settings-option" onClick={() => {navigate(`/updatebio/${userObject.user_account_id}`)}}>Update Bio</h2>
                    <h2 className="settings-option" onClick={() => {navigate(`/changename/${userObject.user_account_id}`)}}>Change My Name</h2>
                    <h2 className="settings-option" onClick={() => {navigate(`/changepassword/${userObject.user_account_id}`)}}>Change My Password</h2>
                    <h2 className="settings-option" onClick={() => {navigate(`/deleteaccount/${userObject.user_account_id}`)}}>Delete My Account</h2>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
    
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-md-8 profile-right">
          <Card className="profile-event-card">
            <Card.Title className="profile-title">Events you're interested in..</Card.Title>
            <Card.Body>
              {displayMyEvents}
            </Card.Body>
          </Card>
          <Card className="profile-event-card">
            <Card.Title className="profile-title">Events you've created..</Card.Title>
            
            <Button className="profile-create-event-btn" onClick={() => {navigate(`/createEvent`)}}>Create Event</Button>
            <Card.Body>
              {displayCreatedEvents}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>

  )
}