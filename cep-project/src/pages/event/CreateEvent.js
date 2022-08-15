import React, { useState, useContext } from 'react';
import './CreateEvent.css';
import { Card } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import './Event.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";

export const CreateEvent = () => {

    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    const [eventName, setEventName] = useState('');
    const [eventDescriptionIntro, setEventDescriptionIntro] = useState('');
    const [eventDescriptionBody, setEventDescriptionBody] = useState('');
    const [eventFree, setEventFree] = useState('');
    const [eventTicketLink, setEventTicketLink] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventImage, setEventImage] = useState('');
    const userId = authState.id;

    const onSubmit = () => {
        Axios.post(`http://localhost:3001/event/createevent` , {
            headers: {accessToken: localStorage.getItem("accessToken")},
            eventName: eventName,
            eventDescriptionIntro: eventDescriptionIntro,
            eventDescriptionBody: eventDescriptionBody,
            eventFree: eventFree,
            eventTicketLink: eventTicketLink,
            eventDate: eventDate,
            eventTime: eventTime,
            eventLocation: eventLocation,
            eventImage: eventImage,
            userId: userId
        }).then((Response) => {
            if (Response.data.error) {
              alert(Response.data.error);
            } else {
              console.log(Response.data);
                navigate('/neweventsubmitted');
                window.location.reload();
            }
        });
    }

    return (

        <Card className="create-event">
            <h1 className='create-event-header'>Create Your Own Event</h1>
            <h2>Have an event coming up that you'd like to promote? We can help you with that, free of charge.</h2>

            <form className="form-container form-group create-event-form"> 
            <div>                      
                <label htmlFor="inputEventName">Event Name</label><br/>
                <input type="text" id="input-event-name" className="form-input-signup signup create-input" name="name"
                onChange={(e) => {
                    setEventName(e.target.value);
                }}></input>
            </div>
            <div>
                <label htmlFor="inputEventDescriptionIntro">Please provide an introduction to your event, no more than 1000 characters.</label><br/>
                <textarea type="textarea" rows="4" id="input-event-description" className="form-input-signup signup create-input long-input" name="descriptionintro"
                onChange={(e) => {
                    setEventDescriptionIntro(e.target.value);
                }}></textarea>
            </div>
            <div>
                <label htmlFor="inputEventDescriptionBody">Please provide any additional information you wish to share about your event, no more than 5000 characters.</label><br/>
                <textarea type="textarea" rows="6" id="input-event-description" className="form-input-signup signup create-input long-input" name="descriptionbody"
                onChange={(e) => {
                    setEventDescriptionBody(e.target.value);
                }}></textarea>
            </div>
            <div>
                <label htmlFor="inputEventDate">Date</label><br/>
                <DatePicker name="date" className="form-input-signup signup create-input" selected={eventDate} onChange={date => setEventDate(date)}/>
            </div>
            <div>
                <label htmlFor="inputEventTime">Time</label><br/>
                <input type="text" id="input-event-time" className="form-input-signup signup create-input" name="time"
                 onChange={(e) => {
                    setEventTime(e.target.value);
                }}></input>
            </div>
            <div>
                <label>Location</label><br/>
                <input type="text" id="input-event-location" className="form-input-signup signup create-input" name="location"
                onChange={(e) => {
                    setEventLocation(e.target.value);
                }}></input>
            </div> 
            <div>
                <label htmlFor="inputEventImg">Image</label><br/>
                <input type="text" id="input-event-image" className="form-input-signup signup create-input" name="eventimage"
                onChange={(e) => {
                    setEventImage(e.target.value);
                }}></input>
            </div> 
            <label id="my-radio-group">Is your event free?</label>
            <div role="group" aria-labelledby="my-radio-group" className="create-input">
                <label>
                    <input type="radio" name="free" value="1" className="create-check"
                    onChange={(e) => {
                        setEventFree(e.target.value);
                    }}/>Yes
                </label>
                <label>
                    <input type="radio" name="free" value="0" className="create-check"
                    onChange={(e) => {
                        setEventFree(e.target.value);
                    }}/>No
                </label>
            </div>
            <div>
                <label htmlFor="inputEventTicketLink">Please provide the link to your event ticket provider</label><br/>
                <input type="text" id="input-event-ticketlink" className="form-input-signup signup create-input" name="ticketlink"
                    onChange={(e) => {
                        setEventTicketLink(e.target.value);
                    }}></input>
                </div>
                <button type="submit" className="btn btn-primary eventure-btn create-event-btn" onClick={onSubmit}>Create Event</button>
            </form>
            
        </Card>

    )
}

