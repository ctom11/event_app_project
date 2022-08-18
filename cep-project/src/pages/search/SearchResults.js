import React, { useContext, useState } from "react";
import './SearchResults.css';
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Moment from "moment";
import { SearchContext } from "../../components/SearchContext";

export const SearchResults = () => {

    let navigate = useNavigate()
    const { searchState } = useContext(SearchContext);


    return (
        <div>
            <Card className="search-results-card">
                <h1 className="search-results-header">Your search returned the following results..</h1>
            </Card>
            <Row xs={1} md={3} className="g-4">
                        {searchState.map((value, key) => { 
                        return(
                            //<Col key={key}>
                            <Col>
                                <Card className="whatson-card h-100" onClick={() => {navigate(`/event/${value.event_id}`)}}>
                                    <Card.Img className="event-img" variant="top" src={value.event_img}/>                                
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
                        )})}
                    </Row>
        </div>
    )

}