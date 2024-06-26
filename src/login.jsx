import React from "react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import "./app.css";


function LoginPage(){
    const [value, setValue] = useState("");
    const [hover, setHover] = useState(false);
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
    const onClickButtonStyle = {
        ...onHoverButtonStyle,
        boxShadow: null,
        transition: 'box-shadow 0.1s'
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
                    <button 
                        onMouseOver={e => {setStyle(onHoverButtonStyle)}} 
                        onMouseLeave={e => {setStyle(ButtonStyle)}} 
                        style={buttonStyle}>
                            Log In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;