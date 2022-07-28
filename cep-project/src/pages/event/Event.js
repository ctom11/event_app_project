import React, { useEffect, useState } from "react";
import './Event.css';
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";

export const Event = () => {

    let { id } = useParams();
    const [eventObject, setEventObject] = useState({});

    useEffect(() => {
        Axios.get(`http://localhost:3001/event/byId/${id}`).then((Response) => {
            console.log(Response)
            setEventObject(Response.data);
        });
    }, [])

    return (

        /*where i left off: event info is coming through to console. just wont display*/

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 event-tabs">
            <Tab eventKey="event-info" title="Event Information">
                <div className="event-p">{eventObject.event_name}</div>
                <div className="event-p">{eventObject.event_description}</div>
                <div className="event-p">{eventObject.event_date}</div>
                <div className="event-p">{eventObject.event_time}</div>
                <div className="event-p">{eventObject.event_location}</div>
                <div className="event-p">{eventObject.event_img}</div>
            </Tab>
            <Tab eventKey="location" title="Location">
                <div className="event-p">{id}</div>
            </Tab>
            <Tab eventKey="buy-tickets" title="Buy Tickets">
                <div className="event-p">{id}</div>
            </Tab>
            <Tab eventKey="comments" title="Comments">
                <div className="event-p">{id}</div>
            </Tab>
        </Tabs>

    )
}