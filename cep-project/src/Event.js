import React from "react";
import './Event.css';
import { Card, Button, Nav } from "react-bootstrap";

export const Event = () => (
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first" className="event-nav">Event Information</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link" className="event-nav">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="event-nav">
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>Event Name</Card.Title>
        <Card.Text className="event-text">
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
          <p>With supporting text below as a natural lead-in to additional content.</p>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
)