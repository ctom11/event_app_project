import React, { useEffect } from "react";
import './Whatson.css';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button } from "react-bootstrap";
import TestImage from '../../assets/images/test.jpg';
import axios from "axios";


export const Whatson = () => {

    /*get the data from API to fill the event cards
    axios.get('http://localhost:3001/login')*/
    

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
                {Array.from({ length: 6 }).map((_, idx) => (
                    <Col>
                        <Card className="whatson-card">
                            <Card.Img variant="top" src={TestImage} />
                            <Card.Body>
                                <Card.Title>Event Name</Card.Title>
                                <Card.Text>
                                <p>14th July 2022</p>
                                <p>Custom House Square, Belfast</p>
                                </Card.Text>
                                <Link to="/Event">
                                    <Button variant="primary">More info</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    </Col>
</Row>
  
) 

};
