import React from "react";
import './Whatson.css';
import { Col, Row, Card, Button, Container } from "react-bootstrap";

export const Whatson = () => (

<Container>
    <Row>
        {/*This first column contains the side menu*/}
        <Col className="col-md-1">This is where the side menu will go
        </Col>
        {/*This column then contains the event cards*/}
        <Col>
            <div>
                <Row xs={1} md={3} className="g-4">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <Col className="col-md-11">
                            <Card className="whatsoncard">
                                <Card.Img variant="top" src="holder.js/100px160" />
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
    </Container>





)