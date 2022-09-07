import React from "react-bootstrap";
import { Card } from "react-bootstrap";
import './AboutUs.css';

export const FAQs = () => {

    return (
        <div>
            <Card className="about-us-card">
                <h1 className="about-us-title">FAQs</h1>
                <div className="about-us-text">
                    <h4 className="about-us-question">Can I buy tickets for events on the Eventure webapp?</h4>
                    <h4>Unfortunately, tickets aren't available for purchase directly from us here at Eventure. We do however provide a link straight to the official ticket provider!</h4>

                    <h4 className="about-us-question">Will I be charged for sharing my event on Eventure?</h4>
                    <h4>We will never charge for posting events! Sharing your event is completely free.</h4>

                    <h4 className="about-us-question">How do I share my event?</h4>
                    <h4>It's easy! Once you've created an account, follow the link on your user profile to get started.</h4>

                    <h4 className="about-us-question">What area do you promote events for?</h4>
                    <h4>We share events for across Northern Ireland.</h4>
                </div>
            </Card>
        </div>
    )
    
}