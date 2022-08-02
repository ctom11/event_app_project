import React, { useEffect, useState } from "react";
import './Whatson.css';
import { Col, Row, Card, Button } from "react-bootstrap";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Moment from "moment";

export const Whatson = () => {

    //for displaying date in Do MMMM YYYY formart rather than YYYY/MM/DD
    const formatDate = Moment().format("Do MMMM YYYY");

    /*get the data from API to fill the event cards*/
    const [listOfEvents, setListOfEvents] = useState([]);

    /*set up for connecting to individual event page*/
    let navigate = useNavigate()
    useEffect(() => {
    Axios.get('http://localhost:3001/event').then((Response) => {
        console.log(Response)
        setListOfEvents(Response.data)
    });
    }, []);
    
    //for passing id through for filtering purposes
    function FilterEventByGenre(id) {
        useEffect(() => {
            Axios.get(`http://localhost:3001/event/byGenre/${id}`).then((Response) => {
                console.log(Response)
                setListOfEvents(Response.data);
            });
        }, [])
    }

    return (
  
        <Row>
        {/*This first column contains the side menu*/}
        {/*d-md-block d-sm-none prevents the side menu from being shown when screen is smaller than medium - mobile friendly*/}
            <Col className="col-md-2 d-md-block d-sm-none">
                <div id="wrapper" className="toggled whatson-div">
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li>
                                <Button onClick={FilterEventByGenre(16)} className='sidemenu-items'>Music</Button>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Sight-Seeing</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Nightlife</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Comedy</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Family Events</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Sport</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Art</a>
                            </li>
                            <li>
                                <a href="#" className='sidemenu-items'>Film</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
            {/*This column then contains the event cards*/}
            <Col className="col-md-10">
                <div>
                    <Row className="whatson-filter">
                        <h1>This is where the filter will go.</h1>
                    </Row>
                    <Row xs={1} md={3} className="g-4">
                        {listOfEvents.map((value, key) => {
                        return(
                            <Col>
                                <Card className="whatson-card h-100" onClick={() => {navigate(`/event/${value.event_id}`)}}>
                                    <Card.Img className="event-img" variant="top" src={value.event_img}/>                                
                                    <Card.Body>
                                        <Card.Title>{value.event_name}</Card.Title>
                                        <Card.Text>
                                            <p>{formatDate}</p>
                                            <p>{value.event_time}</p>
                                            <p>{value.event_location}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )})}
                    </Row>
                </div>
            </Col>
        </Row>
  
    ) 

};
