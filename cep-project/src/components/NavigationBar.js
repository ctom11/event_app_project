import React, { useContext, useState } from "react";
import './NavigationBar.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo.png';
import { AuthContext } from "./AuthContext";


export const NavigationBar = () => {

    /*set up for connecting to individual event page*/
    let navigate = useNavigate()
    
    const accessToken = localStorage.getItem("accessToken");
    const { authState } = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState('');

    const Search = () => {
        navigate('/searchresults/' + searchQuery);
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        navbarContent = <Nav className="ml-auto">
        <Nav.Item><Nav.Link href="/whatson" className="nav-nav">What's On</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/signup" className="nav-nav">Sign Up</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/login" className="nav-nav">Login</Nav.Link></Nav.Item>
        </Nav>;
        window.location.reload();
    }

    let navbarContent = 
    <Nav className="ml-auto">
        <Nav.Item><Nav.Link href="/whatson" className="nav-nav">What's On</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/signup" className="nav-nav">Sign Up</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/login" className="nav-nav">Login</Nav.Link></Nav.Item>
    </Nav>;

    if (accessToken) {
        navbarContent = 
        <Nav className="ml-auto">
            <Nav.Item><Nav.Link href="/whatson" className="nav-nav">What's On</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href={"/userprofile/" + authState.id} className="nav-nav">My Profile</Nav.Link></Nav.Item>
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
                <div className="search">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search for Events" aria-label="Search"
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}></input>
                        <button className="btn btn-outline-success search-btn" type="submit" onClick={Search}>Search</button>
                    </form>
                </div>
            </Container>
        </Navbar>
    )
}