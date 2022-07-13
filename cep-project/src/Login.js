import React from "react";
import './Login.css';
import { Link } from 'react-router-dom';
import { Signup } from "./Signup";
import LoginArt from './assets/loginart.png';

export const Login = () => (
        <div className="card mb-3">
      <div className="row g-0">
        {/*image beside login form*/}
        <div className="col-md-7">
          <img src={LoginArt} className="img-fluid rounded-start"></img>
          <h2>Don't have an account yet? <Link to={Signup}><i>Sign up here.</i></Link></h2>
        </div>
        {/*login form*/}
        <div className="col-md-5">          
          <div className="card-body">
            <form>
              <div className="mb-3">
                <h1>Sign In</h1>
                <label htmlFor="inputemail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="inputemail" aria-describedby="emailHelp"></input>
                <div id="emailHelp" className="form-text"></div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputpassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputpassword"></input>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                <label className="form-check-label" htmlFor="exampleCheck1">Keep me logged in</label>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

)