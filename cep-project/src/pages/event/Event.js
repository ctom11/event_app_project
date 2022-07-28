import React, { useEffect } from "react";
import './Event.css';
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import axios from "axios";

export const Event = () => {

    let { id } = useParams();

    useEffect(() => {
        Axios.get('http://localhost:3001/whatson').then((Response) => {
            console.log(Response)
            setListOfEvents(Response.data)
        });
    })

    return (

<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 event-tabs">
    <Tab eventKey="event-info" title="Event Information">
        <card>
            <div className="event-p">{id}</div>
        </card>
    </Tab>
    <Tab eventKey="location" title="Location">
        <card>
            <div className="event-p">{id}</div>
        </card>
    </Tab>
    <Tab eventKey="buy-tickets" title="Buy Tickets">
        <card>
            <div className="event-p">{id}</div>
        </card>
    </Tab>
    <Tab eventKey="comments" title="Comments">
        <card>
            <div className="event-p">{id}</div>
        </card>
    </Tab>
</Tabs>

)
    }