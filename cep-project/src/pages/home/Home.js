import React from "react";
import './Home.css';
import homeImage1 from '../../assets/images/crowd-background.jpg';
import homeImage2 from '../../assets/images/circus-crowd.jpg';
import homeImage3 from '../../assets/images/cinema.jpg';
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => (
   
  <Carousel fade>
    <Carousel.Item>
      <img className="d-block w-100" src={homeImage1} alt="First slide"/>
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" src={homeImage2} alt="Second slide"/>
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" src={homeImage3} alt="Third slide"/>
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>

)