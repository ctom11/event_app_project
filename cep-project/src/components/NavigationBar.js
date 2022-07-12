import React from "react";
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { NavLink } from "react-router-dom";

export const NavigationBar = () => (

    <Navbar expand="lg">
        <Navbar.Brand href="/">Eventure</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/whatson">What's On</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/signup">Sign Up</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)