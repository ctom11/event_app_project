import React, { useEffect, useState } from "react";
import './Event.css';
//banner used if event image has not been provided
import defaultEventBanner from '../../assets/images/default-event-banner.png';
import { Card, Row, Col, Accordion, Toast } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Moment from "moment";

export const Event = () => {

    //for displaying date in Do MMMM YYYY formart rather than YYYY/MM/DD
    const formatDate = Moment().format("Do MMMM YYYY");

    //for passing id through to display individual event info
    let { id } = useParams();
    const [eventObject, setEventObject] = useState({});
    const [commentObject, setCommentObject] = useState({});
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:3001/event/byId/${id}`).then((Response) => {
            console.log(Response)
            setEventObject(Response.data);
        });
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3001/event/comments/${id}`).then((Response) => {
            console.log(Response)
            setCommentObject(Response.data);
        });
    }, [])

    let commentblock = <Toast className="comments-toast"></Toast>;
    if(Array.isArray(commentObject)){
        commentblock = commentObject.map((value, key) => { 
            return(
                <Toast className="comments-toast">
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Where name will go</strong>
                        <small>{value.event_comment_time}</small>
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

    const addComment = () => {
        Axios.post(`http://localhost:3001/event/addcomment`, {commentBody: newComment, commentEventId: id, commentTime: Date.now()}).then ((Response) => {
            console.log("Comment added");
        })
        
    }

    return (

        <div className="event-full">
            <Card className="event-img-card">
            <div className="p-5 text-center bg-image rounded-3 no-repeat h-120" style={eventImageStyle}>
                <div className="mask" styles="background-color: rgba(0, 0, 0, 0.6);">
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 className="event-name-h1 mb-3">{eventObject.event_name}</h1>
                            <h4 className=" event-name-h4 mb-3">{eventObject.event_location}</h4>
                        </div>
                    </div>
                </div>
            </div>
            </Card>
            
            <Card className="event-bottom-card">
                <Row className="justify-content-md-center">
                    <Col xs lg="8">
                        <h1 className="event-p event-title">{eventObject.event_name}</h1>
                        <h2 className="event-p event-name-h2">{formatDate} - {eventObject.event_location}</h2>
                    </Col>
                    <Col xs lg="4">
                            <Card className="tickets-card">
                                <div>
                                    <a className="tickets-text" href={eventObject.event_ticket_link}><h1 className="tickets-text">Get Tickets</h1></a>
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
                    </Col>
                </Row>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className="event-p">More Information</Accordion.Header>
                        <Accordion.Body>
                            <h2 className="event-p event-name-h2">{eventObject.event_time}</h2>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header  className="event-p">Location</Accordion.Header>
                        <Accordion.Body>
                            <h2 className="event-p event-name-h2">{eventObject.event_location}</h2>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header  className="event-p">Comments</Accordion.Header>
                        <Accordion.Body>

                            <div className="add-comment-container">
                                <h2>{eventObject.event_name} </h2>
                                <h2>Leave a comment here:</h2>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Start typing.." onChange={(e) => {setNewComment(e.target.value)}}></textarea>
                                <button className="eventure-btn" onClick={addComment}>Add Comment</button>
                            </div>
                            <div>
                                {
                                commentblock
                                }
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card>
        </div>

    )
}