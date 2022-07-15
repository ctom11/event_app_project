import React from "react";
import './NavigationBar.css';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { NavLink } from "react-router-dom";
import Logo from '../assets/logo.png';

export const NavigationBar = () => (

    <Navbar expand="lg">

        <Navbar.Brand href="/">
            <img className="logo" src={Logo} width="220" height="60"  alt="Acar Yatak logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/whatson" className="nav-nav">What's On</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/signup" className="nav-nav">Sign Up</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/login" className="nav-nav">Login</Nav.Link></Nav.Item>
            </Nav>

        </Navbar.Collapse>

        <form class="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success search-btn" type="submit">Search</button>
          </form>

    </Navbar>
)