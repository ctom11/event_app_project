import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home.js';
import { Whatson } from './pages/whatson/Whatson';
import { Signup } from './pages/signup/Signup';
import { Login } from './pages/login/Login';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Event } from './pages/event/Event';
import { Userprofile } from './pages/userprofile/Userprofile';
import { CreateEvent } from './pages/event/CreateEvent';
import { AuthContext } from './components/AuthContext'; 
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {

    const[authState, setAuthState] = useState({firstName: "", id: 0, adminStatus: 0});

    useEffect(() => {
      Axios.get('http://localhost:3001/login/auth', { headers: {
        accessToken: localStorage.getItem('accessToken')
      }}).then((Response) => {
        if (Response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      })
    }, []);


    return (
      /*react fragment allows you to group multiple elements*/
      <React.Fragment>
        <NavigationBar/>
        <Layout>
          <AuthContext.Provider value={{ authState, setAuthState }}>
            <Router>
              <Routes>
                <Route exact path ='/' element = {<Home/>}/>
                <Route path ='/whatson' element = {<Whatson/>}/>
                <Route path ='/signup' element = {<Signup/>}/>
                <Route path ='/login' element = {<Login/>}/>
                <Route path ='/event/:id' element = {<Event/>}/>
                <Route path ='/userprofile/:id' element = {<Userprofile/>}/>
                <Route path ='/createEvent' element = {<CreateEvent/>}/>
              </Routes>
            </Router>
          </AuthContext.Provider>
        </Layout>
      </React.Fragment>
    );
  }


export default App;
