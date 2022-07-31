import React, { useEffect, useState } from "react";
import './Event.css';
import { Row, Tab, Tabs } from "react-bootstrap";
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
            <div className="row g-0">
                <div className="col-md-6">

                </div>
                <div className="col-md-6">
                    <img src={eventObject.event_img}/>
                </div>
            </div>
            <div className="row g-0">

            </div>
                <div className="event-p">{eventObject.event_name}</div>
                <div className="event-p">{eventObject.event_description}</div>
                <div className="event-p">{eventObject.event_date}</div>
                <div className="event-p">{eventObject.event_time}</div>
                <div className="event-p">{eventObject.event_location}</div>
        
        </div>
          

    )
}