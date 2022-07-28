import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import './Event.css';
import Axios from "axios";
import CreateEventArt from '../../assets/images/crowd-background.jpg';
import { useNavigate } from "react-router-dom";

export const CreateEvent = () => {

    const [event_name, setEventName] = useState('')
    const [event_description, setEventDescription] = useState('')
    const [event_time, setEventTime] = useState('')
    const [event_location, setEventLocation] = useState('')
    const [event_img, setEventImage] = useState('')
  
    /*for date input*/
    const [selectedDate, setSelectedDate] = useState(null);
    /*have to create initial values for Formik*/
    const initialValues = {
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
        image: ""
    }

    /*set up for connecting to individual event page*/
    let navigate = useNavigate()

    /*provides validation on form input*/
    const validationSchema = Yup.object().shape({
        name: Yup.string().max(100).required, //Event name must be a string, max 100 chars and is required
        description: Yup.string().max(250).required, //Event description must be a string, max 250 chars and is required
        date: Yup.date().required, //date is required
        time: Yup.string().required, //Event time must be a string and is required
        location: Yup.string().required, //Event location must be a string and is required
    })

    const onSubmit = (data) => {
        Axios.post('http://localhost:3001/event/createevent', {
            eventName: event_name, eventDate: selectedDate, eventTime: event_time, eventLocation: event_location, eventDescription: event_description, eventImage: event_img
        }).then(() => {
            /*navigate to home after creating event - change*/
            navigate(`/home`)
        });
    }

    return (

        <Card className="create-event">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <form className="form-container form-group">
                    <h1>Create Your Own Event</h1>
                    <h2>Have an event coming up that you'd like to promote? We can help you with that, free of charge.</h2>
                    <div>
                        <label>Event Name</label><br/>
                        <ErrorMessage name="name" component="span"/>
                        <Field id="input-event-name" className="form-input-signup signup" name="Event Name"
                        onChange={(e) => {
                            setEventName(e.target.value);
                        }}
                        />
                    </div>
                    <div>
                        <label>Description</label><br/>
                        <ErrorMessage name="description" component="span"/>
                        <Field id="input-event-description" className="form-input-signup signup" name="Description"
                        onChange={(e) => {
                            setEventDescription(e.target.value);
                        }}/>
                    </div>
                    <div>
                        <label>Date</label><br/>
                        <ErrorMessage name="date" component="span"/>
                        <DatePicker className="form-input-signup signup" selected={selectedDate} onChange={date => setSelectedDate(date)} />
                    </div>
                    <div>
                        <label>Time</label><br/>
                        <ErrorMessage name="time" component="span"/>
                        <Field id="input-event-time" className="form-input-signup signup" name="Time" 
                        onChange={(e) => {
                            setEventTime(e.target.value);
                        }}/>
                    </div>
                    <div>
                        <label>Location</label><br/>
                        <ErrorMessage name="location" component="span"/>
                        <Field id="input-event-location" className="form-input-signup signup" name="Location"
                        onChange={(e) => {
                            setEventLocation(e.target.value);
                        }}/>
                    </div>
                    <div>
                        <label>Image</label><br/>
                        <Field type="text" id="input-event-image" className="form-input-signup signup" name="Image"
                        onChange={(e) => {
                            setEventImage(e.target.value);
                        }}/>
                    </div>
                    <button type="submit" className="btn btn-primary form-button" onClick={onSubmit}>Create Event</button>
                </form>
            </Formik>
        </Card>

    )
}

