import React from "react";
import './Footer.css';
import Logo from '../assets/images/logo.png';
import Pdf from '../assets/EventureTermsConditions.pdf';

export const Footer = () => {
    
    return (
        <div className="row footer-full">
            <div className="col-sm-3 footer-col">
                <img className="logo-footer" src={Logo} width="164" height="45" />
                <hr/>
                <h4 className="footer-contact-us">Contact Us</h4>
                <h4 className="footer-info">email: eventure@gmail.com</h4>
                <h4 className="footer-info">phone: 07712345678</h4>
            </div>
            <div className="col-sm-3 footer-col">
                <h4 className="footer-header">About Us</h4>
                <a href="/ourcompany"><h4 className="footer-info">Our Company</h4></a>
                <a href = {Pdf} target = "_blank"><h4 className="footer-info">Terms and Conditions</h4></a>
                <a href="/faqs"><h4 className="footer-info">FAQs</h4></a>
            </div>
            <div className="col-sm-3 footer-col">
                <h4 className="footer-header">Social</h4>
                <a href="http://www.facebook.com"><h4 className="footer-info">Facebook</h4></a>
                <a href="http://www.twitter.com"><h4 className="footer-info">Twitter</h4></a>
                <a href="http://www.instagram.com"><h4 className="footer-info">Instagram</h4></a>
            </div>
        </div>
    )

}