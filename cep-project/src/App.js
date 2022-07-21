import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home.js';
import { Whatson } from './pages/whatson/Whatson';
import { Signup } from './pages/signup/Signup';
import { Login } from './pages/login/Login';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Event } from './pages/event/Event';
import { Userprofile } from './pages/userprofile/Userprofile';

class App extends Component {
  render() {
    return (
      /*react fragment allows you to group multiple elements*/
      <React.Fragment>
        <NavigationBar/>
        <Layout>
          <Router>
            <Routes>
              <Route exact path ='/' element = {<Home/>}/>
              <Route path ='/whatson' element = {<Whatson/>}/>
              <Route path ='/signup' element = {<Signup/>}/>
              <Route path ='/login' element = {<Login/>}/>
              <Route path ='/event' element = {<Event/>}/>
              <Route path ='/Userprofile' element = {<Userprofile/>}/>
              <Route element = {<NoMatch/>} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
