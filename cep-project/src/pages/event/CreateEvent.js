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
        Axios.post('http://localhost:3001/event/createevent', data).then(() => {
            console.log(data)
                navigate('/neweventsubmitted');
                window.location.reload();
        });
    }

    return (

        <Card className="create-event">
            <h1 className='create-event-header'>Create Your Own Event</h1>
            <h2>Have an event coming up that you'd like to promote? We can help you with that, free of charge.</h2>
            
                
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="form-container form-group create-event-form">

                            <div>                      
                                <label htmlFor="inputEventName">Event Name</label><br/>
                                <ErrorMessage name="name" component="span"/>
                                <Field type="text" id="input-event-name" className="form-input-signup signup create-input" name="name"></Field>
                            </div>
                            <div>
                                 <label htmlFor="inputEventDescriptionIntro">Please provide an introduction to your event, no more than 1000 characters.</label><br/>
                                <ErrorMessage name="descriptionintro" component="span"/>
                                <Field component="textarea" rows="4" id="input-event-description" className="form-input-signup signup create-input long-input" name="descriptionintro"></Field>
                            </div>
                            <div>
                                <label htmlFor="inputEventDescriptionBody">Please provide any additional information you wish to share about your event, no more than 5000 characters.</label><br/>
                                <ErrorMessage name="descriptionintro" component="span"/>
                                <Field component="textarea" rows="6" id="input-event-description" className="form-input-signup signup create-input long-input" name="descriptionbody"></Field>
                            </div>
                            <div>
                                <label htmlFor="inputEventDate">Date</label><br/>
                                <ErrorMessage name="date" component="span"/>
                                <DatePicker name="date" className="form-input-signup signup create-input" selected={selectedDate} onChange={date => setSelectedDate(date)} />
                            </div>
                            <div>
                                <label htmlFor="inputEventTime">Time</label><br/>
                                <ErrorMessage name="time" component="span"/>
                                <Field type="text" id="input-event-time" className="form-input-signup signup create-input" name="time"></Field>
                            </div>
                            <div>
                                <label>Location</label><br/>
                                <ErrorMessage name="location" component="span"/>
                                <Field type="text" id="input-event-location" className="form-input-signup signup create-input" name="location"></Field>
                            </div>      
                            <div>
                                <label htmlFor="inputEventImg">Image</label><br/>
                                <ErrorMessage name="image" component="span"/>
                                <input type="file" id="input-event-image" className="create-input file-upload" name="image"></input>
                            </div>
                            <label id="my-radio-group">Is your event ticketed?</label>
                            <div role="group" aria-labelledby="my-radio-group" className="create-input">
                                <label>
                                    <Field type="radio" name="ticket" value="One" className="create-check"/>
                                    Yes
                                </label>
                                <label>
                                    <Field type="radio" name="ticket" value="Two" className="create-check"/>
                                    No
                                </label>
                            </div>
                            <div>
                                <label htmlFor="inputEventTicketLink">Please provide the link to your event ticket provider</label><br/>
                                <ErrorMessage name="ticketlink" component="span"/>
                                <Field type="text" id="input-event-ticketlink" className="form-input-signup signup create-input" name="ticketlink"></Field>
                            </div>
                            <button type="submit" className="btn btn-primary eventure-btn" onClick={onSubmit}>Create Event</button>
                        
                    </Form>
                </Formik>

            
        </Card>

    )
}

