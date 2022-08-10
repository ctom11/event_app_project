import React, { useState } from 'react';
import './CreateEvent.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import './Event.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateEvent = () => {

    const [event_name, setEventName] = useState('')
    const [event_description_intro, setEventDescriptionIntro] = useState('')
    const [event_description_body, setEventDescriptionBody] = useState('')
    const [event_time, setEventTime] = useState('')
    const [event_location, setEventLocation] = useState('')
    const [event_img, setEventImage] = useState('')
    const [event_free, setEventFree] = useState('')
    const [event_ticket_link, setEventTicketLink] = useState('')
  
    /*for date input*/
    const [selectedDate, setSelectedDate] = useState(null);
    /*have to create initial values for Formik*/
    const initialValues = {
        name: "",
        descriptionintro: "",
        descriptionbody: "",
        date: "",
        time: "",
        location: "",
        image: "",
        ticket: "",
        ticketlink: "",
    }

    /*set up for connecting to individual event page*/
    let navigate = useNavigate()

    /*provides validation on form input*/
    const validationSchema = Yup.object().shape({
        name: Yup.string().max(100).required, //Event name must be a string, max 100 chars and is required
        descriptionintro: Yup.string().max(1000).required, //Event description must be a string, max 250 chars and is required
        descriptionbody: Yup.string().max(5000).required, //Event description must be a string, max 250 chars and is required
        date: Yup.date().required, //date is required
        time: Yup.string().required, //Event time must be a string and is required
        location: Yup.string().required, //Event location must be a string and is required
    })

    const onSubmit = (data) => {
        Axios.post('http://localhost:3001/event/createevent', {
            eventName: event_name, eventDate: selectedDate, eventTime: event_time, eventLocation: event_location, eventDescriptionIntro: event_description_intro, eventDescriptionBody: event_description_body, eventFree: event_free, eventTicketLink: event_ticket_link, eventImage: event_img
        }).then(() => {
            /*navigate to home after creating event - change*/
            navigate(`/home`)
        });
    }

    return (

        <Card className="create-event">
            <h1 className='create-event-header'>Create Your Own Event</h1>
            <h2>Have an event coming up that you'd like to promote? We can help you with that, free of charge.</h2>
            
                
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <form className="form-container form-group create-event-form">

                            <div>
                                <label>Event Name</label><br/>
                                <ErrorMessage name="name" component="span"/>
                                <Field id="input-event-name" className="form-input-signup signup create-input" name="name"
                                onChange={(e) => {
                                    setEventName(e.target.value);
                                }}
                                />
                            </div>
                            <div>
                                 <label>Description Header</label><br/>
                                <ErrorMessage name="description" component="span"/>
                                <Field id="input-event-description" className="form-input-signup signup create-input" name="descriptionintro"
                                onChange={(e) => {
                                    setEventDescriptionIntro(e.target.value);
                                }}/>
                            </div>
                            <div>
                                <label>Description Body</label><br/>
                                <ErrorMessage name="description" component="span"/>
                                <Field id="input-event-description" className="form-input-signup signup create-input" name="descriptionbody"
                                onChange={(e) => {
                                    setEventDescriptionBody(e.target.value);
                                }}/>
                            </div>
                            <div>
                                <label>Date</label><br/>
                                <ErrorMessage name="date" component="span"/>
                                <DatePicker name="date" className="form-input-signup signup create-input" selected={selectedDate} onChange={date => setSelectedDate(date)} />
                            </div>
                            <div>
                                <label>Time</label><br/>
                                <ErrorMessage name="time" component="span"/>
                                <Field id="input-event-time" className="form-input-signup signup create-input" name="time" 
                                onChange={(e) => {
                                    setEventTime(e.target.value);
                                }}/>
                            </div>
                            <div>
                                <label>Location</label><br/>
                                <ErrorMessage name="location" component="span"/>
                                <Field id="input-event-location" className="form-input-signup signup create-input" name="location"
                                onChange={(e) => {
                                    setEventLocation(e.target.value);
                                }}/>
                            </div>      
                            <div>
                                <label>Image</label><br/>
                                <Field type="text" id="input-event-image" className="form-input-signup signup create-input" name="image"
                                onChange={(e) => {
                                    setEventImage(e.target.value);
                                }}/>
                            </div>
                            <div id="my-radio-group">Picked</div>
                            <div role="group" aria-labelledby="my-radio-group" className="create-input">
                                <label>
                                    <Field type="radio" name="ticket" value="One"/>
                                    Ticket Required
                                </label>
                                <label>
                                    <Field type="radio" name="ticket" value="Two"/>
                                    No Ticket required
                                </label>
                            </div>
                            <div>
                                <label>Please provide the link to your event ticket provider</label><br/>
                                <Field type="text" id="input-event-image" className="form-input-signup signup create-input" name="image"
                                onChange={(e) => {
                                    setEventImage(e.target.value);
                                }}/>
                            </div>
                            <button type="submit" className="btn btn-primary eventure-btn" onClick={onSubmit}>Create Event</button>
                        
                    </form>
                </Formik>

            
        </Card>

    )
}

