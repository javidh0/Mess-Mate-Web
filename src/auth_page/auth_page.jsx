import React from "react";
import { useState, useEffect } from "react";
import "../app.css";
import "./auth_page.css";
import { Link, useNavigate } from "react-router-dom";
import {loginApi, signUpApi} from "./api";
import {login, setLogin} from "../auth_data/auth_data";

function SignUp(){
    const [error, setError] = useState([false, "-"]);
    const naviagte = useNavigate();
    const [data, setdata] = useState({});
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

    async function signUp(){
        try{
            let x = await signUpApi(data);
            naviagte("/login");
        }
        catch(e){
            var temp = e['response'];
            console.log(temp['error']);
            if(temp['status'] == 422) setError([true, temp['data']['error']])
            else setError([true, 'Unknown Error'])
        }
    }

    function onChange(e){
        var temp = data;
        var field = e.target.name;
        var val = e.target.value;

        if(field == 'user_name') temp['user_name'] = val;
        else if(field == 'user_id') temp['user_id'] = val;
        else if(field == 'password') temp['password'] = val;

        setdata(temp);
    }

    return (
        <div className="login-page">
            <div id="app-name">
                <h1>Mess Mate</h1>
            </div>
            <div id="form-div">
                <div id="input-fields" style={{"marginTop" : "15vh"}}>
                    <h2>Sign Up</h2>
                    <input onChange={onChange} name="user_name" type="text" placeholder="User Name"/>
                    <input onChange={onChange} name="user_id" type="text" placeholder="User Id"/>
                    <input onChange={onChange} name="password" type="password" placeholder="Password"/>

                    {error[0] && <p style={{color:"red"}}>{error[1]}</p>}
                    
                    <button
                        onClick={signUp}
                        onMouseOver={e => {setStyle(onHoverButtonStyle)}}
                        onMouseLeave={e => {setStyle(ButtonStyle)}}
                        style={buttonStyle}>
                            Sign Up
                    </button>
                    
                    <p id="sign-up">Already have a account? <span><Link to="/login">Log In</Link></span></p>
                </div>
            </div>
        </div>
    );
}

function LoginPage(props){
    const [error, setError] = useState(false);
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
        try{
            let x = await loginApi(cred['user_id'], cred['password']);
            
            setLogin(
                {
                    "status" : true,
                    "auth" : x
                }
            )
            console.log(login)
            navigate("/");
            
        }catch(e){
            setError(true);
        }
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

                    {error && <p style={{color:"red"}}> Invalid Credentials</p>}
                    
                    <button
                        onMouseOver={e => {setStyle(onHoverButtonStyle)}}
                        onMouseLeave={e => {setStyle(ButtonStyle)}}
                        onClick={onClick}
                        style={buttonStyle}>
                            Log In
                    </button>

                    <p id="sign-up">Do not have a account? <span><Link to="/signup">Sign In</Link></span></p>
                </div>
            </div>
        </div>
    );
}

export {SignUp, LoginPage};
