import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home.js';
import { Whatson } from './pages/whatson/Whatson';
import { Signup } from './pages/signup/Signup';
import { Login } from './pages/login/Login';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer';
import { OurCompany } from './components/OurCompany';
import { FAQs} from './components/FAQs';
import { Event } from './pages/event/Event';
import { Userprofile } from './pages/userprofile/Userprofile';
import { AdminTasks } from './pages/userprofile/AdminTasks';
import { ChangeName } from './pages/userprofile/ChangeName';
import { ChangePassword } from './pages/userprofile/ChangePassword';
import { DeleteAccount } from './pages/userprofile/DeleteAccount';
import { DeleteEvent } from './pages/userprofile/DeleteEvent';
import { CreateEvent } from './pages/event/CreateEvent';
import { NewEventSubmitted } from './pages/event/NewEventSubmitted';
import { SearchResults } from './pages/search/SearchResults';
import { AuthContext } from './components/AuthContext'; 
import { SearchContext } from './components/SearchContext'; 
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {

    const[authState, setAuthState] = useState({firstName: "", id: 0, adminStatus: 0});
    const[searchState, setSearchState] = useState([]);

    useEffect(() => {
      Axios.get('http://localhost:3001/login/auth', { headers: {
        accessToken: localStorage.getItem('accessToken')
      }}).then((Response) => {
        if (Response.data.error) {
          setAuthState(false);
        } else {
          setAuthState({firstName: Response.data.email_address, id: Response.data.user_account_id, adminStatus: Response.data.admin_status});
        }
      })
    }, []);


    return (
      /*react fragment allows you to group multiple elements*/
      <React.Fragment>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <SearchContext.Provider value={{ searchState, setSearchState }}>
          <NavigationBar/>
          <Layout>
                <Routes>
                  <Route exact path ='/' element = {<Home/>}/>
                  <Route path ='/whatson' element = {<Whatson/>}/>
                  <Route path ='/signup' element = {<Signup/>}/>
                  <Route path ='/login' element = {<Login/>}/>
                  <Route path ='/event/:id' element = {<Event/>}/>
                  <Route path ='/userprofile/:id' element = {<Userprofile/>}/>
                  <Route path ='/admintasks' element = {<AdminTasks/>}/>
                  <Route path ='/createEvent' element = {<CreateEvent/>}/>
                  <Route path ='/neweventsubmitted' element = {<NewEventSubmitted/>}/>
                  <Route path ='/changename/:id' element = {<ChangeName/>}/>
                  <Route path ='/changepassword/:id' element = {<ChangePassword/>}/>
                  <Route path ='/deleteaccount/:id' element = {<DeleteAccount/>}/>
                  <Route path ='/deleteevent/:id' element = {<DeleteEvent/>}/>
                  <Route path ='/ourcompany' element = {<OurCompany/>}/>
                  <Route path ='/faqs' element = {<FAQs/>}/>
                  <Route path ='/searchresults' element = {<SearchResults/>}/>
                </Routes>
          </Layout>
          </SearchContext.Provider>
        </AuthContext.Provider>
        <Footer/>
      </React.Fragment>
    );
  }


export default App;
