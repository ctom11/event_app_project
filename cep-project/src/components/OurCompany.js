import React from "react-bootstrap";
import { Card } from "react-bootstrap";
import './AboutUs.css';

export const OurCompany = () => {

        return (
            <div>
                <Card className="about-us-card">
                    <h1 className="about-us-title">Our Company</h1>
                    <div className="about-us-text">
    
                        <h4 className="company-info">Eventure was established in Belfast in 2022. We wanted to give the people of Northern Ireland a central point of access to the latest and greatest things happening around them, from concerts to nature hikes, and everything in between!</h4>
                        <h4 className="company-info">We operate right here in Belfast, and promote events all over Northern Ireland.</h4>
                        <h4 className="company-info">Want to contact us?</h4>
                        <h4 className="company-info">email: eventure@gmail.com</h4>
                        <h4 className="company-info">phone: 07712345678</h4>

                    </div>
                </Card>
            </div>
        )

}