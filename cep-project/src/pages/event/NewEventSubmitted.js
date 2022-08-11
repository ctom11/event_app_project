import React from 'react';
import './CreateEvent.css';
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css'
import './Event.css';

export const NewEventSubmitted = () => {
  
    return (

        <Card className="create-event">
            <h1 className='create-event-header'>Thank you</h1>
            <h2 className='create-event-h2'>Your event is currently waiting for an admin to review it. Once that's been done you'll see it go live to the Eventure <i>What's On</i> page.</h2>
            <h2 className='create-event-h2'>If you have any questions in the meantime or if you need to make any changes to your submitted event, please email us at eventure@gmail.com</h2>
            <Link to="/"><h2 className='create-event-h2 back-to-home'>Click here to go back to homepage</h2></Link>
        </Card>

    )
}
