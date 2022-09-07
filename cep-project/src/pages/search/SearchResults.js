import React, { useState, useEffect } from "react";
import './SearchResults.css';
import { Col, Row, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Moment from "moment";
import Axios from 'axios';

export const SearchResults = () => {

    useEffect(() => {
        document.title = 'Search Results - Eventure';
      });

    let navigate = useNavigate()
    const [eventsObject, setEventsObject] = useState([]);

    let { searchQuery } = useParams();


    useEffect(() => {
        Axios.get(`http://localhost:3001/search/${searchQuery}`).then((Response) => {
            console.log("Search Response");
            console.log(Response);
            setEventsObject(Response.data);
        });
    }, [])

    //show my events only if there are any
    let displaySearchResults =  <h1 className="search-results-header">Your search returned 0 results..</h1>
    if (eventsObject.length > 0) {
        displaySearchResults =  <h1 className="search-results-header">Your search returned the following results..</h1>
    }

    return (
        
        <div className="search-results-page">
            <Card className="search-results-card">
                {displaySearchResults}
            </Card>
        <Row xs={1} md={3} className="g-4">
            {eventsObject.map((value, key) => { 
                console.log(value);
                return(
                    <Col>
                        <Card className="whatson-card h-100" onClick={() => {navigate(`/event/${value.event_id}`)}}>
                            <Card.Img className="event-img" variant="top" src={`http://localhost:3002/${value.event_img}`}/>                                
                            <Card.Body className="event-card-body">
                                <Card.Title className="event-name-title">{value.event_name}</Card.Title>
                                <Card.Text>
                                    <p className="event-pa">{Moment(value.event_date).format("Do MMMM YYYY")}</p>
                                    <p className="event-pa">{value.event_time}</p>
                                    <p className="event-pa">{value.event_location}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>          
        </div>
    )

}