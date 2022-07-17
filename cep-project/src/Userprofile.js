import React from "react";
import './Userprofile.css';
import { Card, Row, Col } from "react-bootstrap";
import TestImage from './assets/profile-pic-logo.png';

export const Userprofile = () => (
    <Row xs={1} md={1} className="g-4">
        <Col className="col-md-3">
            <Card>
                <Card.Img className="profile-picture" variant="top" src={TestImage} />
                <Card.Body>
                    <Card.Title className="profile-title">Card title</Card.Title>
                    <Card.Text className="profile-text">
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col className="col-md-9">
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title className="profile-title">Card title</Card.Title>
              <Card.Text className="profile-text">
                Here will be information on events user is interested and going to.
              </Card.Text>
              <Card.Title className="profile-title">Card title</Card.Title>
              <Card.Text className="profile-text">
                Here will be information on events user is interested and going to.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title className="profile-title">Posted Events</Card.Title>
              <Card.Text className="profile-text">
                Here will be information on user's own events.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
    </Row>
)