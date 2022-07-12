import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home.js';
import { Whatson } from './Whatson';
import { Signup } from './Signup';
import { Login } from './Login';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';

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
              <Route element = {<NoMatch/>} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
