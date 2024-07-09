import React from "react";
import { useState, useEffect } from "react";
import "../app.css";
import "./auth_page.css";
import { Link, useNavigate } from "react-router-dom";
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

function LoginPage(props){
    console.log(props.login);
    const navigate = useNavigate();
    const [cred, setCred] = useState({});
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
        let x = await loginApi(cred['user_id'], cred['password']);
        if(x['status'] == 200) {
            props.setLogin(
                {
                    "status" : true,
                    "auth" : x
                }
            )
            navigate("/");
        }
        console.log(x);
    }

    function setEmail(e) {
        var temp = cred;
        temp['user_id'] = e.target.value;
        setCred(temp);
        console.log(cred);
    }
    function setPassword(e) {
        var temp = cred;
        temp['password'] = e.target.value;
        setCred(temp);
        console.log(cred);
    }

    return (
        <div className="login-page">
            <div id="app-name">
                <h1>Mess Mate</h1>
            </div>
            <div id="form-div">
                <div id="input-fields">
                    <h2>Log In</h2>
                    <input onChange={setEmail} type="text" placeholder="Email"/>
                    <input onChange={setPassword} type="password" placeholder="Password"/>
                    
                    <button
                        onMouseOver={e => {setStyle(onHoverButtonStyle)}}
                        onMouseLeave={e => {setStyle(ButtonStyle)}}
                        onClick={onClick}
                        style={buttonStyle}>
                            Log In
                    </button>

                    <p id="sign-up">Do not have a account? <span><Link to="/signup">Log In</Link></span></p>
                </div>
            </div>
        </div>
    );
}

export {SignUp, LoginPage};
