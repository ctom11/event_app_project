import React, { useEffect, useState } from "react";
import Select from "react-select";
import './Whatson.css';
import { Col, Row, Card, Button } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Moment from "moment";

export const Whatson = () => {

    //for displaying date in Do MMMM YYYY format rather than YYYY/MM/DD
    const formatDate = Moment().format("Do MMMM YYYY");

    //get the data from API to fill the event cards
    const [listOfEvents, setListOfEvents] = useState([]);

    //set up for connecting to individual event page
    let navigate = useNavigate()
    useEffect(() => {
        Axios.get('http://localhost:3001/event').then((Response) => {
            console.log(Response)
            setListOfEvents(Response.data)
    });
    }, []);
    
    //for passing id through for genre filtering purposes
    const FilterEventByGenre = (id) => {
            Axios.get(`http://localhost:3001/event/byGenre/${id}`).then((Response) => {
                console.log(Response)
                setListOfEvents(Response.data);
            });
    }

    //for filtering free events
    const FilterFreeEvents = () => {
        Axios.get(`http://localhost:3001/event/free`).then((Response) => {
            console.log(Response)
            setListOfEvents(Response.data);
        });
    }

    //create options to choose from for filter at top
    const sortOptions = [
        { value: 1, label: 'A-Z' },
        { value: 2, label: 'Newest' },
        { value: 3, label: 'Oldest' }
        ]

    return (
  
        <Row>
        {/*This first column contains the side menu*/}
        {/*d-md-block d-sm-none prevents the side menu from being shown when screen is smaller than medium - mobile friendly*/}
            <Col className="col-md-2 d-md-block d-sm-none">
                <div id="wrapper" className="toggled whatson-div">
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li>
                                <Button onClick={() => FilterEventByGenre(16)} className='sidemenu-items'>Music</Button>
                            </li>
                            <li>
                                <Button onClick={() => FilterEventByGenre(18)} className='sidemenu-items'>Sight-Seeing</Button>
                            </li>
                            <li>
                                <Button onClick={() => FilterEventByGenre(19)} className='sidemenu-items'>Nightlife</Button>
                            </li>
                            <li>
                                <Button onClick={() => FilterEventByGenre(17)} className='sidemenu-items'>Comedy</Button>
                            </li>
                            <li>
                                <Button onClick={() => FilterEventByGenre(20)} className='sidemenu-items'>Family Events</Button>
                            </li>
                            <li>
                                <Button onClick={() => FilterEventByGenre(21)} className='sidemenu-items'>Sport</Button>
                            </li>
                            <li>
                                <Button onClick={() => FilterEventByGenre(22)} className='sidemenu-items'>Art</Button>
                            </li>
                            <li>
                                <Button onClick={() => FilterEventByGenre(23)} className='sidemenu-items'>Film</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
            {/*This column then contains the event cards*/}
            <Col className="col-md-10">
                <div>
                    <Row className="whatson-filter">
                        <Row>
                            <Col class="col-md-10">
                                <Button className="free-events-btn" onClick={() => FilterFreeEvents()}>Free Events</Button>
                            </Col>
                            <Col class="col-md-10 sort-events">
                                <Select options={sortOptions}  placeholder={'Sort Events'} clearable={false}/>
                            </Col>
                        </Row>
                    </Row>
                    <Row xs={1} md={3} className="g-4">
                        {listOfEvents.map((value, key) => { 
                        return(
                            //<Col key={key}>
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
