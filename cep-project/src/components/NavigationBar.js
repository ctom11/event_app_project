import React, { useContext } from "react";
import './NavigationBar.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { NavLink } from "react-router-dom";
import Logo from '../assets/images/logo.png';
import { AuthContext } from "./AuthContext";


export const NavigationBar = () => {
    
    const accessToken = localStorage.getItem("accessToken");
    const { setAuthState } = useContext(AuthContext);
    

    const logout = () => {
        localStorage.removeItem("accessToken");
        navbarContent = <Nav className="ml-auto">
        <Nav.Item><Nav.Link href="/whatson" className="nav-nav">What's On</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/signup" className="nav-nav">Sign Up</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/login" className="nav-nav">Login</Nav.Link></Nav.Item>
        </Nav>;
        window.location.reload();
    }

    //where I left off: figure out how to pass user ID through to bring to specific profile page

    let navbarContent = <Nav className="ml-auto">
    <Nav.Item><Nav.Link href="/whatson" className="nav-nav">What's On</Nav.Link></Nav.Item>
    <Nav.Item><Nav.Link href="/signup" className="nav-nav">Sign Up</Nav.Link></Nav.Item>
    <Nav.Item><Nav.Link href="/login" className="nav-nav">Login</Nav.Link></Nav.Item>
    </Nav>;

    if (accessToken) {
        navbarContent = <Nav className="ml-auto">
        <Nav.Item><Nav.Link href="/whatson" className="nav-nav">What's On</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/userprofile/:id" className="nav-nav">My Profile</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={logout} href="/" className="nav-nav">Logout</Nav.Link></Nav.Item>
    </Nav>
    }

    return(
    <Navbar expand="lg" fixed="top">
        <Container fluid>
            <Navbar.Brand href="/">
                <img className="logo" src={Logo} width="220" height="60"  alt="Acar Yatak logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                {navbarContent}
            </Navbar.Collapse>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search for Events" aria-label="Search"></input>
                <button className="btn btn-outline-success search-btn" type="submit">Search</button>
            </form>
        </Container>
    </Navbar>
    )
}