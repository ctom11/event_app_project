import React, { useState, useEffect } from "react";
import './Userprofile.css';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Card, Row, Col, Button } from "react-bootstrap";
import Moment from "moment";
import Carousel from 'react-bootstrap/Carousel';
import Popover from 'react-bootstrap/Popover';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TestImage from '../../assets/images/profile-pic-logo.png';
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';


export const AdminTasks = () => {

  useEffect(() => {
    document.title = 'Your Admin Tasks - Eventure';
  });

  //for displaying date in Do MMMM YYYY format rather than YYYY/MM/DD
  const formatDate = Moment().format("Do MMMM YYYY");

  //set up for connecting to individual event page
  let navigate = useNavigate()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { id } = useParams();
  //user's account information
  const [userObject, setUserObject] = useState({});
  //events awaiting approval
  const [awaitingApprovalList, setAwaitingApprovalList] = useState([]);
  //featured events
  const [featuredEvents, setFeaturedEvents] = useState([]);

  //get all user info
  useEffect(() => {
    Axios.get(`http://localhost:3001/useraccount/byId/${id}`, {
      headers: {accessToken: localStorage.getItem("accessToken")}, 
    }) .then((Response) => {
      console.log(Response)
      setUserObject(Response.data);
    });
  }, [])

  //get events awaiting admin approval
  useEffect(() => {
    Axios.get('http://localhost:3001/event/awaitingapproval').then((Response) => {
      console.log(Response)
      setAwaitingApprovalList(Response.data)
    });
  }, []);

  //get featured events
  useEffect(() => {
    Axios.get('http://localhost:3001/event/featured').then((Response) => {
      console.log(Response)
      setFeaturedEvents(Response.data)
    });
  }, []);

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
                      <button className="add-comment-btn bio-btn" onClick={UpdateBio}>Add Bio</button>
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

  //approve event
  const approveEvent = (eventId) => {
    Axios.post(`http://localhost:3001/event/approveevent/${eventId}`,
      {},
      {headers: {
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

  //decline event
  const declineEvent = (eventId) => {
    Axios.delete(`http://localhost:3001/event/deleteevent/${eventId}`,
      {headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
      }).then((Response) => {
        if (Response.data.error) {
          alert(Response.data.error);
        } else {
        window.location.reload();
        }
     });
  }

  //remove event from featured events
  const removeFromFeatured = (eventId) => {
    Axios.post(`http://localhost:3001/event/removefromfeatured/${eventId}`, {},
      {headers: {accessToken: localStorage.getItem("accessToken"),}
        }).then((Response) => {
          if (Response.data.error) {
            alert(Response.data.error);
          } else {
            window.location.reload();
          }
      });
  }

  return (

    <div className="profile-page-full">
      <Row xs={1} md={1} className="g-4">
        <Col className="col-md-4 profile-left">
          <Card className="admin-left-info">
            <Card.Img className="profile-picture" variant="top" src={`http://localhost:3002/${userObject.user_profile_picture}`} />
            <Card.Body className="profile-user-details">
              <Card.Text className="profile-text">
                <p className="user-name-profile">{userObject.first_name} {userObject.last_name}</p>
                <p>{userObject.email_address}</p>
              </Card.Text>
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
          <Card className="profile-admin-card">
            <Card.Body>
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 admin-tabs">
                <Tab eventKey="home" title="Events Awaiting Approval"> 
                <div className="approval-page">
                  <br/>
                  <Carousel slide={false} className="event-carousel">
                    {awaitingApprovalList.map((value, key) => { 
                      return(    
                        <Carousel.Item>
                          <img className="d-block w-100 event-carousel-img" src={`http://localhost:3002/${value.event_img}`} alt="First slide"  onClick={() => {navigate(`/event/${value.event_id}`)}}/>
                          <Carousel.Caption>
                            <h3 className="event-carousel-h3">{value.event_name}</h3>
                            <p className="event-carousel-p">{Moment(value.event_date).format("Do MMMM YYYY")} {value.event_time}</p>
                            <Button className="approve-event admin-event-btn" type="submit" onClick={() => approveEvent(value.event_id)}>Approve</Button>
                            <Button className="reject-event admin-event-btn" type="submit" onClick={() => declineEvent(value.event_id)}>Decline</Button>
                          </Carousel.Caption>
                        </Carousel.Item>
                      )
                    })} 
                  </Carousel>
                </div>   
                </Tab>
                <Tab eventKey="profile" title="Featured Events" className="admin-tabs">
                  <Button className="approve-event add-featured-btn" type="submit" href="/whatson">Add Featured Events</Button>
                  <Carousel slide={false} className="event-carousel">
                    {featuredEvents.map((value, key) => { 
                      return(    
                        <Carousel.Item>
                          <img className="d-block w-100 event-carousel-img" src={`http://localhost:3002/${value.event_img}`} alt="First slide"  onClick={() => {navigate(`/event/${value.event_id}`)}}/>
                          <Carousel.Caption>
                            <h3 className="event-carousel-h3">{value.event_name}</h3>
                            <p className="event-carousel-p">{Moment(value.event_date).format("Do MMMM YYYY")} {value.event_time}</p>
                            <Button className="reject-event admin-event-btn" type="submit" onClick={() => removeFromFeatured(value.event_id)}>Remove From Featured</Button>
                          </Carousel.Caption>
                        </Carousel.Item>
                      )
                    })} 
                  </Carousel>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>

  )
}