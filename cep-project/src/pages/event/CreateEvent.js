import React, { useState, useContext, useEffect } from 'react';
import './CreateEvent.css';
import { Form, Card } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import './Event.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";

export const CreateEvent = () => {

    useEffect(() => {
        document.title = 'Create Event - Eventure';
      });

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
    const [image, setImage] = useState({ preview: '', data: '' })
    const [genreId, setGenreId] = useState('');
    const userId = authState.id;

    const handleImageChange = (e) => {
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImage(img)
      }

    const onSubmit = () => {
        let formData = new FormData();
        formData.append('eventName', eventName);
        formData.append('eventDescriptionIntro', eventDescriptionIntro);
        formData.append('eventDescriptionBody', eventDescriptionBody);
        formData.append('eventFree', eventFree);
        formData.append('eventTicketLink', eventTicketLink);
        formData.append('eventDate', eventDate);
        formData.append('eventTime', eventTime);
        formData.append('eventLocation', eventLocation);
        formData.append('eventImage', image.data);
        formData.append('userId', userId);
        formData.append('genreId', genreId);

        Axios.post(`http://localhost:3001/event/createevent` , formData, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
                "Content-Type": "multipart/form-data"
        }
        }).then((Response) => {
            if (Response.data.error) {
              alert(Response.data.error);
            } else {
              console.log(Response.data);
              navigate('/neweventsubmitted');
            }
        });
    }

    return (

        <Card className="create-event">
            <h1 className='create-event-header'>Create Your Own Event</h1>
            <h2>Have an event coming up that you'd like to promote? We can help you with that, free of charge.</h2>
            <div className="form-container form-group create-event-form"> 
                <div>
                    <label htmlFor="inputEventName" className="create-label">Event Name</label><br/>
                    <input type="text" id="input-event-name" className="form-input-signup signup create-input" name="name"
                    onChange={(e) => {
                        setEventName(e.target.value);
                    }}></input>
                </div>
                <div>
                    <label htmlFor="inputEventDescriptionIntro" className="create-label">Please provide an introduction to your event (max. 1000 characters)</label><br/>
                    <textarea type="textarea" rows="4" id="input-event-description" className="form-input-signup signup create-input long-input" name="descriptionintro"
                    onChange={(e) => {
                        setEventDescriptionIntro(e.target.value);
                    }}></textarea>
                </div>
                <div>
                    <label htmlFor="inputEventDescriptionBody" className="create-label">Please provide any additional information you wish to share about your event (max 5000 characters)</label><br/>
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
                    <label htmlFor="inputEventTime" className="create-label">Time</label><br/>
                    <input type="text" id="input-event-time" className="form-input-signup signup create-input" name="time"
                    onChange={(e) => {
                        setEventTime(e.target.value);
                    }}></input>
                </div>   
                <div>
                    <label className="create-label">Location</label><br/>
                    <input type="text" id="input-event-location" className="form-input-signup signup create-input" name="location"
                    onChange={(e) => {
                        setEventLocation(e.target.value);
                    }}></input>
                </div> 
                <div>
                    <label htmlFor="inputEventImg" className="create-label">Image</label><br/>
                    <input type="file" onChange={handleImageChange} id="input-event-image" className="form-input-signup signup create-input" name="eventimage"></input>
                </div> 
                    <label id="my-radio-group" className="create-label">Is your event free?</label>
                <div role="group" aria-labelledby="my-radio-group" className="create-input">
                    <label className="create-label">
                    <input type="radio" name="free" value="1" className="create-check"
                    onChange={(e) => {
                        setEventFree(e.target.value);
                    }}/>Yes
                    </label>
                    <label className="create-label">
                    <input type="radio" name="free" value="0" className="create-check"
                    onChange={(e) => {
                        setEventFree(e.target.value);
                    }}/>No
                    </label>
                </div>
                <div>
                    <label htmlFor="inputEventTicketLink" className="create-label">Please provide the link to your event ticket provider (leave blank if not applicable)</label><br/>
                    <input type="text" id="input-event-ticketlink" className="form-input-signup signup create-input" name="ticketlink"
                    onChange={(e) => {
                        setEventTicketLink(e.target.value);
                    }}></input>
                </div>
                <label htmlFor="inputGenres" className="create-label">Please indicate which <u>one</u> of the following genres best describe your event.</label><br/>
                <Form className="genre-check">
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check inline label="Music" value="16" name="group1" type={type} id={`inline-${type}-1`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                            <Form.Check inline label="Comedy" value="17" name="group1" type={type} id={`inline-${type}-2`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                            <Form.Check inline label="Sight-seeing" value="18" name="group1" type={type} id={`inline-${type}-2`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                            <Form.Check inline label="Nightlife" value="19" name="group1" type={type} id={`inline-${type}-2`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                            <Form.Check inline label="Family Events" value="20" name="group1" type={type} id={`inline-${type}-2`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                            <Form.Check inline label="Sport" value="21" name="group1" type={type} id={`inline-${type}-2`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                            <Form.Check inline label="Art" value="22" name="group1" type={type} id={`inline-${type}-2`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                            <Form.Check inline label="Film" value="23" name="group1" type={type} id={`inline-${type}-2`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                            <Form.Check inline label="Entertainment" value="24" name="group1" type={type} id={`inline-${type}-2`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                            <Form.Check inline label="Food" value="25" name="group1" type={type} id={`inline-${type}-2`}
                            onChange={(e) => {
                                setGenreId(e.currentTarget.value);
                            }}/><br/>
                        </div>
                    ))}
                </Form>
                <button type="submit" className="btn btn-primary eventure-btn create-event-btn" onClick={onSubmit}>Create Event</button>
            </div>
        </Card>

    )
}

