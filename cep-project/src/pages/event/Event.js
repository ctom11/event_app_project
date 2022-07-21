import React from "react";
import './Event.css';
import { Card, Tab, Tabs } from "react-bootstrap";

export const Event = () => (

<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 event-tabs">
    <Tab eventKey="event-info" title="Event Information">
        <card>
            <div className="event-p">1</div>
        </card>
    </Tab>
    <Tab eventKey="location" title="Location">
        <card>
            <div className="event-p">2</div>
        </card>
    </Tab>
    <Tab eventKey="buy-tickets" title="Buy Tickets">
        <card>
            <div className="event-p">3</div>
        </card>
    </Tab>
    <Tab eventKey="comments" title="Comments">
        <card>
            <div className="event-p">3</div>
        </card>
    </Tab>
</Tabs>

)