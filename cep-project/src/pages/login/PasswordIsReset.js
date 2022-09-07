import React, { useEffect } from 'react';
import '../event/CreateEvent.css';
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css'
import '../event/Event.css';

export const PasswordIsReset = () => {

    useEffect(() => {
        document.title = "Password Reset - Eventure";
      });
  
    return (

        <Card className="create-event">
            <h1 className='create-event-header'>Thank you</h1>
            <h2 className='create-event-h2'>Your password has been reset. You can access your new password in your emails.</h2>
            <Link to="/login"><h2 className='create-event-h2 back-to-home'>Click here to go to login</h2></Link>
        </Card>

    )
}
