import React, { useEffect, useState } from "react";
import './Whatson.css';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button } from "react-bootstrap";
/*import TestImage from '../../assets/images/test.jpg';*/
import Axios from "axios";
import { useNavigate } from "react-router-dom";


export const Whatson = () => {

    /*get the data from API to fill the event cards*/
    const [listOfEvents, setListOfEvents] = useState([]);

    /*set up for connecting to individual event page*/
    let navigate = useNavigate()

    useEffect(() => {
    Axios.get('http://localhost:3001/event').then((Response) => {
        console.log(Response)
        setListOfEvents(Response.data)
    });
    }, []);

    return (
  
        <Row>
        {/*This first column contains the side menu*/}
        {/*d-md-block d-sm-none prevents the side menu from being shown when screen is smaller than medium - mobile friendly*/}
            <Col className="col-md-2 d-md-block d-sm-none">
                <div id="wrapper" className="toggled whatson-div">
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li>
                                <a href="#" className='sidemenu-items'>Music</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Sight-Seeing</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Nightlife</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Comedy</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Family Events</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Sport</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Art</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Film</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
            {/*This column then contains the event cards*/}
            <Col className="col-md-10">
                <div>
                    <Row className="whatson-filter">
                        <h1>This is where the filter will go.</h1>
                    </Row>
                    <Row xs={1} md={3} className="g-4">
                        {listOfEvents.map((value, key) => {
                        return(
                            <Col>
                                <Card className="whatson-card" onClick={() => {navigate(`/event/${value.event_id}`)}}>
                                    <Card.Img variant="top" src={value.event_img} />
                                    <Card.Body>
                                        <Card.Title>{value.event_name}</Card.Title>
                                        <Card.Text>
                                            <p>{value.event_date} {value.event_time}</p>
                                            <p>{value.event_location}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )})}
                    </Row>
                </div>
            </Col>
        </Row>
  
    ) 

};
