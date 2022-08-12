import React, { useState } from "react";
import './Userprofile.css';

export const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState('')

    return (

        <div>
            <div className="mb-3">
                <label htmlFor="inputpassword" className="form-label">Your current password:</label>
                <input type="password" className="form-control login" id="inputpassword"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputpassword" className="form-label">Your new password</label>
                <input type="password" className="form-control login" id="inputpassword"
                onChange={(e) => {setNewPassword(e.target.value);}}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputpassword" className="form-label">Re-enter your new password</label>
                <input type="password" className="form-control login" id="inputpassword"></input>
            </div>
        </div> 
    )

}