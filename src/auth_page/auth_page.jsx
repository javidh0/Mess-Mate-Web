import React from "react";
import { useState } from "react";
import "../app.css";
import "./auth_page.css";
import { Link } from "react-router-dom";
import loginApi from "./api";

function SignUp(){
    const [buttonStyle, setStyle] = useState(
        {backgroundColor: "#fffff0"}
    )
    const onHoverButtonStyle = {
        backgroundColor: "#FA8072",
        color: "white",
        minWidth: "100px",
        maxWidth: "423px",
        boxShadow: "#FA8072 5px 5px 10px",
        width: "43vw"
    };
    const ButtonStyle = {backgroundColor: "#fffff0"}; 

    return (
        <div className="login-page">
            <div id="app-name">
                <h1>Mess Mate</h1>
            </div>
            <div id="form-div">
                <div id="input-fields">
                    <h2>Sign Up</h2>
                    <input type="text" placeholder="User Name"/>
                    <input type="text" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <Link to="/">
                        <button
                            onMouseOver={e => {setStyle(onHoverButtonStyle)}}
                            onMouseLeave={e => {setStyle(ButtonStyle)}}
                            style={buttonStyle}>
                                Sign Up
                        </button>
                    </Link>
                    <p id="sign-up">Already have a account? <span><Link to="/login">Log In</Link></span></p>
                </div>
            </div>
        </div>
    );
}

function LoginPage(){
    const [buttonStyle, setStyle] = useState(
        {backgroundColor: "#fffff0"}
    )
    const onHoverButtonStyle = {
        backgroundColor: "#FA8072",
        color: "white",
        minWidth: "100px",
        maxWidth: "423px",
        boxShadow: "#FA8072 5px 5px 10px",
        width: "43vw"
    };
    const ButtonStyle = {backgroundColor: "#fffff0"}; 

    async function onClick(){
        let x = await loginApi();
        console.log(x);
    }

    return (
        <div className="login-page">
            <div id="app-name">
                <h1>Mess Mate</h1>
            </div>
            <div id="form-div">
                <div id="input-fields">
                    <h2>Log In</h2>
                    <input type="text" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    {/* <Link to="/"> */}
                        <button
                            onMouseOver={e => {setStyle(onHoverButtonStyle)}}
                            onMouseLeave={e => {setStyle(ButtonStyle)}}
                            onClick={onClick}
                            style={buttonStyle}>
                                Log In
                        </button>
                    {/* </Link> */}
                    <p id="sign-up">Do not have a account? <span><Link to="/signup">Log In</Link></span></p>
                </div>
            </div>
        </div>
    );
}

export {SignUp, LoginPage};
