import React, { useState, useEffect } from "react";
import './Userprofile.css';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Card, Row, Col, Button } from "react-bootstrap";
import Moment from "moment";
import Popover from 'react-bootstrap/Popover';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TestImage from '../../assets/images/profile-pic-logo.png';
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';


export const AdminTasks = () => {

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
        {
         headers: {
             accessToken: localStorage.getItem("accessToken"),
         }
     }).then((Response) => {
          if (Response.data.error) {
            alert(Response.data.error);
          } else {
          navigate("/admintasks")
          window.location.reload();
          }
        });
    };

  //decline event
  const declineEvent = (eventId) => {
    Axios.delete(`http://localhost:3001/event/deleteevent/${eventId}`,
           {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((Response) => {
          if (Response.data.error) {
            alert(Response.data.error);
          } else {
          navigate("/admintasks")
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
            navigate("/admintasks")
            window.location.reload();
          }
      });
  }

  return (

    <div className="profile-page-full">
      <Row xs={1} md={1} className="g-4">
        <Col className="col-md-3 profile-left">
          <Card>
            <Card.Img className="profile-picture" variant="top" src={profilePicture} />
            <Card.Body className="profile-user-details">
              <Card.Text className="profile-text">
                <p className="user-name-profile">{userObject.first_name} {userObject.last_name}</p>
                <p>{userObject.email_address}</p>
                {bioDisplay}
              </Card.Text>
              <button className="admin-tasks-btn" onClick={() => {navigate(`/admintasks`)}}>View My Admin Tasks</button><br/>
              <Button className="account-settings-btn" variant="primary" onClick={handleShow}>Account Settings</Button>
              <Button className="account-settings-btn" variant="primary" onClick={logout}>Logout</Button>
              <Offcanvas show={show} onHide={handleClose} className="account-settings-offcanvas">
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body className="account-settings-body">
                  <h1>Account Settings</h1>
                  <div className="account-settings-options">
                    <h2 className="settings-option">Update Profile Picture</h2>
                    <h2 className="settings-option">Update Bio</h2>
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
          <Card className="">
            <Card.Body>
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 admin-tabs">
                <Tab eventKey="home" title="Events Awaiting Approval"> 
                <div className="approval-page">            
                  <div xs={1} md={3} className="row g-4">
                    {awaitingApprovalList.map((value, key) => { 
                      return(     
                        <div>          
                          <Card className="admin-view-card h-100" onClick={() => {navigate(`/event/${value.event_id}`)}}>
                            <Card.Img className="event-img-home" variant="top" src={value.event_img}/>                                
                            <Card.Body className="home-card-body">
                              <Card.Text>
                                <p className="admin-event-info">{value.event_name}</p>
                                <p className="admin-event-info">{formatDate}</p>
                                <p className="admin-event-info">{value.event_time}</p>
                                <p className="admin-event-info">{value.event_location}</p>
                              </Card.Text>
                              <Button className="approve-event admin-event-btn" type="submit" onClick={() => approveEvent(value.event_id)}>Approve</Button>
                              <Button className="reject-event admin-event-btn" type="submit" onClick={() => declineEvent(value.event_id)}>Decline</Button>
                            </Card.Body>
                          </Card>
                        </div>
                      )
                    })}
                  </div>
                  </div>   
                </Tab>
                <Tab eventKey="profile" title="Featured Events" className="admin-tabs">
                  <Button className="approve-event admin-event-btn" type="submit" href="/whatson">Add Featured Events</Button>
                  <Row xs={1} md={2} className="g-4 home-event-cards">
                    {featuredEvents.map((value, key) => { 
                      return(
                        <Col className="">
                          <Card className="admin-view-card h-100" onClick={() => {navigate(`/event/${value.event_id}`)}}>
                            <Card.Img className="event-img-home" variant="top" src={value.event_img}/>                                
                            <Card.Body className="home-card-body">
                              <Card.Text>
                                <p className="admin-event-info">{value.event_name}</p>
                                <p className="admin-event-info">{formatDate}</p>
                                <p className="admin-event-info">{value.event_time}</p>
                                <p className="admin-event-info">{value.event_location}</p>
                              </Card.Text>
                              <Button className="reject-event admin-event-btn" type="submit" onClick={() => removeFromFeatured(value.event_id)}>Remove From Featured</Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>

  )
}