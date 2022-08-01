import React, { useEffect, useState } from "react";
import './Event.css';
import { Card } from "react-bootstrap";
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

    var eventImageStyle = {
        height: "600px",
        width: "1400px",
        backgroundSize: '1400px',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${eventObject.event_img})`
    };

    return (

        <div className="event-full">
            <Card className="event-img-card">
            <div className="p-5 text-center bg-image rounded-3 no-repeat h-120" style={eventImageStyle}>
                <div className="mask" styles="background-color: rgba(0, 0, 0, 0.6);">
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 className="event-name-h1 mb-3">{eventObject.event_name}</h1>
                            <h4 className="mb-3">{eventObject.event_location}</h4>
                        </div>
                    </div>
                </div>
            </div>
            </Card>
            
            <Card>
                <div>
                    <h1 className="event-p">{eventObject.event_name}</h1>
                    <p className="event-p">{eventObject.event_date} {eventObject.event_time}</p>
                </div>

                <p className="event-p">{eventObject.event_description}</p>

                <p className="event-p">{eventObject.event_location}</p>
            </Card>


        </div>

    )
}