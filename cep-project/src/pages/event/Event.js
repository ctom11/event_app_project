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

        <div>
                <div className="event-p">{eventObject.event_name}</div>
                <div className="event-p">{eventObject.event_description}</div>
                <div className="event-p">{eventObject.event_date}</div>
                <div className="event-p">{eventObject.event_time}</div>
                <div className="event-p">{eventObject.event_location}</div>
                <div className="event-p"><img src={eventObject.event_img}/></div>
        
        </div>
          

    )
}