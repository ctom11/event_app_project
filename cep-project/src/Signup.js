import React from "react";
import './Signup.css';

export const Signup = () => (
<div className="card signup-card">
    <div className="card-body">
        <h5 className="card-title signup-title">Sign Up</h5>
        <form className="signup-form">
        <div className="row">
            <div className="form-group col-md-6">
                <label for="inputFirstName">First Name</label>
                <input type="text" class="form-control form-input-signup" id="inputFirstName" placeholder="First Name"></input>
            </div>
            <div className="form-group col-md-6">
                <label for="inputLastName">Last Name</label>
                <input type="text" class="form-control form-input-signup" id="inputLastName" placeholder="Last Name"></input>
            </div>
            <div className="form-group">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control form-input-signup" id="inputEmail4" placeholder="Email"></input>
            </div>
            <div className="form-group">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control form-input-signup" id="inputPassword4" placeholder="Password"></input>
            </div>
            <div className="form-group">
                <label for="inputConfirmPassword4">Confirm Password</label>
                <input type="password" class="form-control form-input-signup" id="inputConfirmPassword4" placeholder="Confirm Password"></input>
            </div>
            <div className="form-group">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"></input>
                    <label className="form-check-label" for="gridCheck">
                    Check me out
                    </label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary signup-button">Sign in</button>
        </div>
        </form>
    </div>
</div>
);