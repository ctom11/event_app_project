import React from "react";
import './Whatson.css';
import { Col, Row, Card, Button, Container } from "react-bootstrap";
import TestImage from './assets/test.jpg';

export const Whatson = () => (

<Row>
    {/*This first column contains the side menu*/}
    <Col className="col-md-2">
        <div id="wrapper" className="toggled">
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li>
                        <a href="#">Music</a>
                    </li>
                    <li>
                        <a href="#">Sight-Seeing</a>
                    </li>
                    <li>
                        <a href="#">Nightlife</a>
                    </li>
                    <li>
                        <a href="#">Comedy</a>
                    </li>
                    <li>
                        <a href="#">Family Events</a>
                    </li>
                    <li>
                        <a href="#">Sport</a>
                    </li>
                    <li>
                        <a href="#">Art</a>
                    </li>
                    <li>
                        <a href="#">Film</a>
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
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    </Col>
</Row>

)