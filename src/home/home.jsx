import React, { useState, useEffect } from "react";
import { RiContactsLine } from "react-icons/ri";
import "./home.css";
import "../app.css"

function MenuCard(props) {
    return (
        <div className="card">
            <img src="https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg" alt="" />
            <div>
                <h4>{props.name}</h4>
                <p>Overall Rating {props.rate}</p>
            </div>
        </div>
    );
}

function builder(n) {
    let tr = [];
    for(var i=0; i<n; i++) {
        tr.push(<MenuCard name="Dosa" rate="4.5"/>);
    }
    return tr;
}

function MenuDisplay(props) {
    return (
        <div className="menu-display">
            <h2>Today's Breakfast</h2>
            <p>Time : 7:00am - 9:00am</p>
            <div className="Scroll">
                {builder(10)}
            </div>
        </div>
    )
}

function MenuEachDay(props) {
    
}

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

function dayBuilder(day, setDay){
    let date = new Date();
    let tr = [];
    for(var i=0; i<7; i++){
        tr.push(
            <div onClick={() => setDay(i)} id={day == i ? "time-select":""}><p>{date.getDay()}</p></div>
        );
        date.setDate(date.getDate() + 1);
    }

    return tr;
}

function Home(){
    const [day, setDay] = useState(0);
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
            <div className="time">
                {dayBuilder(day, setDay)}
            </div>
            <MenuDisplay/>
            
        </div>
    );
}

export default Home;