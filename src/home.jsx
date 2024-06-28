import React, { useState, useEffect } from "react";
import { RiContactsLine } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import "./home.css";
import "./app.css";

function Options(){
    function MouseOverHandle() {
    }
    function MouseLeaveHandle() {       
    }
    return (
        <div className="options" onMouseOver={MouseOverHandle} onMouseLeave={MouseLeaveHandle}>
            <p>Thing</p>
            <p>Something</p>
            <p>-----------</p>
            <p>Log Out</p>
        </div>
    )
}

function Profile(props){
    const hoverStyle = {
        backgroundColor : "#FA8072",
        color : "white",
        boxShadow : "grey 2px 2px 4px",
        transition : "all 0s"
    }
    const defaultStyle = {
        backgroundColor : "white",
        transition : "all 0s"
    }
    const [style, setStyle] = useState({});

    function MouseOverHandle() {
        setStyle(hoverStyle);
    }
    function MouseLeaveHandle() {
        setStyle(defaultStyle);
    }

    return (
        <div 
            className="profile-button" 
            style={style} 
            onMouseOver={MouseOverHandle} 
            onMouseLeave={MouseLeaveHandle}
            onClick={() => {props.optionsToogle()}}
        >
                <RiContactsLine size={25}/>
        </div>
    )
}

function Home(){
    const [disOptions, setDisOptions] = useState(false);

    function optionsToogle() {
        setDisOptions(!disOptions);
    }

    return (
        <div className="home">
            <nav>
                <h3>Mess Mate</h3>
                <Profile optionsToogle = {optionsToogle} />
            </nav>
            {disOptions && <Options/>}
        </div>
    );
}

export default Home;