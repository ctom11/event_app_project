import React, { useEffect, useState } from "react";
import './Home.css';
import { Link } from 'react-router-dom';
import homeImage1 from '../../assets/images/crowd-background.jpg';
import homeImage2 from '../../assets/images/circus-crowd.jpg';
import homeImage3 from '../../assets/images/cinema.jpg';
import Carousel from 'react-bootstrap/Carousel';
import { Col, Row, Card, Button } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Moment from "moment";

export const Home = () => {

  useEffect(() => {
    document.title = 'Home - Eventure';
  });

  //for displaying date in Do MMMM YYYY format rather than YYYY/MM/DD
  const formatDate = Moment().format("Do MMMM YYYY");

  //get the data from API to fill the event cards
  const [listOfEvents, setListOfEvents] = useState([]);
  
  //set up for connecting to individual event page
  let navigate = useNavigate()

  //get featured events
  useEffect(() => {
      Axios.get('http://localhost:3001/event/featured').then((Response) => {
          console.log(Response)
          setListOfEvents(Response.data)
  });
  }, []);

  return (

    <div className="home-page-full">

      <Carousel fade>
        <Carousel.Item>
          <img className="w-100 home-carousel-image" src={homeImage1} alt="First slide"/>
          <Carousel.Caption className="carousel-caption-1">
            <h3 className="carousel-slide-label">Trying to plan a fun day out but not sure where to start? We've got you covered.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-100 home-carousel-image" src={homeImage2} alt="Second slide"/>
          <Link to="/Login">
            <Carousel.Caption className="carousel-caption-2">
              <h3 className="carousel-slide-label">Share your events right here.</h3>
              <p className="carousel-slide-p">It couldn't be simpler. Log into your account now and get started.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-100 home-carousel-image" src={homeImage3} alt="Third slide"/>
          <Link to="/Signup">
            <Carousel.Caption className="carousel-caption-3">
              <h3 className="carousel-slide-label">Want to keep up to date with the latest events? Create your account now.</h3>
            </Carousel.Caption>
          </Link>
        
        </Carousel.Item>
      </Carousel>

      <div className="home-featured-events">
        <h1 className="h1-featured">Featured Events</h1>

        <Row xs={1} md={2} className="g-4 home-event-cards">
          {listOfEvents.map((value, key) => { 
            return(
              //<Col key={key}>
              <Col className="featured-card-size">
                <Card className="featured-card h-100" onClick={() => {navigate(`/event/${value.event_id}`)}}>
                  <Card.Img className="event-img-home" variant="top" src={value.event_img}/>                                
                  <Card.Body className="home-card-body">
                    <Card.Title>{value.event_name}</Card.Title>
                    <Card.Text>
                      <p className="featured-event-info">{formatDate}</p>
                      <p className="featured-event-info">{value.event_time}</p>
                      <p className="featured-event-info">{value.event_location}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )})}
        </Row>
      </div>

    </div>

  )

}