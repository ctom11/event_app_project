import React, { useEffect, useState, useContext } from "react";
import './Event.css';
//banner used if event image has not been provided
import defaultEventBanner from '../../assets/images/default-event-banner.png';
import { Card, Row, Col, Accordion, Toast, Button} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Moment from "moment";
import TestImage from '../../assets/images/profile-pic-logo.png';
import { AuthContext } from "../../components/AuthContext";

export const Event = () => {

    //for accessing user ID
    const accessToken = localStorage.getItem("accessToken");
    const { authState } = useContext(AuthContext);

    //for passing time of comment through to db
    var commentTimeNow = Moment().format();

    //for passing id through to display individual event info
    let { id } = useParams();
    const [eventObject, setEventObject] = useState({});
    const [commentObject, setCommentObject] = useState({});
    const [newComment, setNewComment] = useState("");

    //get event info by id
    useEffect(() => {
        Axios.get(`http://localhost:3001/event/byId/${id}`).then((Response) => {
            console.log(Response)
            setEventObject(Response.data);
        });
    }, [])

    //get event comments
    useEffect(() => {
        Axios.get(`http://localhost:3001/event/comments/${id}`).then((Response) => {
            console.log(Response)
            setCommentObject(Response.data);
        });
    }, [])

    let commentblock = <Toast className="comments-toast"></Toast>;
    if(Array.isArray(commentObject)){
        commentblock = commentObject.map((value, key) => { 
            //set default profile picture
            let profilePicture = TestImage;
            if (value.user_profile_picture) {
                profilePicture = value.user_profile_picture
            }
            //for displaying comment time for now
            var date = Moment().format(value.event_comment_time);
            const fromNow = Moment(date).fromNow();
            return(
                <Toast className="comments-toast">
                    
                    <Toast.Header>
                        <img src={profilePicture} className="rounded me-2 comment-user-pic" alt="" />
                        <strong className="me-auto comment-user-name">{value.first_name} {value.last_name}</strong>
                        <small>{fromNow}</small>
                    </Toast.Header>
                    <Toast.Body>{value.event_comment_body}</Toast.Body>
                </Toast>
            )
            })
    }

    //set background image for banner
    var eventImageStyle = {
        height: "600px",
        width: "1400px",
        backgroundSize: '1400px',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${eventObject.event_img}), url(${defaultEventBanner})`, 
        onerror: "this.onerror=null; this.src=${defaultEventBanner}"
    };

    //only allow comments if logged in
    const addComment = () => {
        Axios.post(`http://localhost:3001/event/addcomment`, {commentBody: newComment, commentEventId: id, commentTime: commentTimeNow},
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        ).then ((Response) => {
            if (Response.data.error) {
                console.log(Response.data.error);
            } else {
                setNewComment([...commentObject, newComment]);
                window.location.reload();
            }
        })
    }

    //add to interested events
    const [buttonText, setButtonText] = useState('I am Interested');

    const addToInterested = () => {
        Axios.post(`http://localhost:3001/useraccount/addToInterested`, {eventId: eventObject.event_id},
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        ).then ((Response) => {
            if (Response.data.error) {
                console.log(Response.data.error);
            } else {
                setButtonText('I am Interested');
            }
        })
    }

    //only link to tickets if they exist
    let ticketOptions = <h1 className="tickets-text">Tickets Not Required</h1>
    if (eventObject.event_ticket_link) {
        ticketOptions = <a className="tickets-text" href={eventObject.event_ticket_link}><h1 className="tickets-text">Get Tickets</h1></a>
    }

     //only let users comment if they are logged in
     let displayCommentBox = ""
     if (accessToken) {
        displayCommentBox = <div className="add-comment-container">
        <h2 className="leave-comment-here">Leave a comment here:</h2>
        <textarea className="form-control comment-form" id="exampleFormControlTextarea1" rows="3" placeholder="Start typing..." onChange={(e) => {setNewComment(e.target.value)}}></textarea>
        <button className="add-comment-btn" onClick={addComment}>Add Comment</button>
    </div>
     }

    return (

        <div className="event-full">
            <Card className="event-img-card">
            <div className="p-5 text-center bg-image rounded-3 no-repeat h-120" style={eventImageStyle}>
            </div>
            </Card>
            
            <Card className="event-bottom-card">
                <Row className="justify-content-md-center">
                    <Col xs lg="8">
                        <h1 className="event-p event-title">{eventObject.event_name}</h1>
                        <h2 className="event-p event-name-h2">{eventObject.event_location} - {Moment(eventObject.event_date).format("Do MMMM YYYY")}, {eventObject.event_time}</h2>
                    </Col>
                    <Col xs lg="4">
                        <Card className="tickets-card">
                            <div>
                                {ticketOptions}
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="8" className="event-description">
                        <p className="event-p">{eventObject.event_description_intro}</p>
                        <p className="event-p">{eventObject.event_description_body}</p>
                    </Col>
                    <Col xs lg="4">
                        <Card className="event-stats">
                            <div>
                                <h1>{eventObject.event_interested}</h1>
                                <p>Interested in this event</p>
                            </div>
                        </Card>
                        <div className="user-event-status">
                            <Button className="event-status-btn" onClick={addToInterested}>{buttonText}</Button>
                        </div>
                    </Col>
                </Row>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header  className="event-p">Location</Accordion.Header>
                        <Accordion.Body>
                            <h2 className="event-p event-name-h2">{eventObject.event_location}</h2>
                            <iframe className="event-map" width="1000" height="400" loading="lazy" allowFullScreen referrerpolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDQgQktcZ2zNRGdvaxuUaXY3Y2it9G4cfY&q=${eventObject.event_location}`}></iframe> 
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className="event-p">Comments</Accordion.Header>
                        <Accordion.Body>
                            {displayCommentBox}
                            <div>
                                {commentblock}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card>
        </div>

    )
}