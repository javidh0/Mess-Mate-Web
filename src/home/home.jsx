import React, { useState, useEffect } from "react";
import { RiContactsLine } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import "./home.css";
import "../app.css"
import { useNavigate } from "react-router-dom";

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

    const [open, setOpen] = useState(props.open);
    const [style, setStyle] = useState({});

    function onClickHandle(){
        setOpen(!open);
        setStyle({});
    }

    return (
        <div className="menu-display">
            <h2 onClick={onClickHandle}> 
                {open ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> }
                {props.day} {props.name}
            </h2>
            {open && <p className="fade-in">Time : {props.time}</p>}
            {open && <div className="Scroll fade-in" style={style}> {builder(10)} </div>}
        </div>
    )
}

function MenuEachDay(props) {
    
}

function Options(props){
    function MouseOverHandle() {
    }
    function MouseLeaveHandle() {       
    }
    
    return (
        <div className="options" onMouseOver={MouseOverHandle} onMouseLeave={MouseLeaveHandle}>
            <p>Thing</p>
            <p>Something</p>
            <p>-----------</p>
            <p onClick={() => {props.logout()}}>Log Out</p>
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

function Home(props){
    const navigate = useNavigate();

    let date = new Date();

    const [day, setDay] = useState(date.getDay());
    const [login, setLogin] = useState(true);
    const [disOptions, setDisOptions] = useState(false);

    useEffect(() => {if(!props.login['status']) {
        navigate("/login");
    }}, []);


    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    

    function optionsToogle() {
        setDisOptions(!disOptions);
    }


    function myGetDay() {
        let x = date.getDay();
        if(date.getDay() == day) return "Today's";
        return days[day];
    }

    function logout() {
        props.setLogin({
            "status" : false,
            "auth" : {}
        })
        navigate("/login");
    }

    return (
        <div className="home">
            <nav>
                <h3>Mess Mate</h3>
                <Profile optionsToogle = {optionsToogle}/>
            </nav>
            {disOptions && <Options logout = {logout}/>}
            <div className="time">
                <div onClick={() => setDay(0)} id={day == 0 ? "time-select":""}><p>{days[0]}</p></div> 
                <div onClick={() => setDay(1)} id={day == 1 ? "time-select":""}><p>{days[1]}</p></div>
                <div onClick={() => setDay(2)} id={day == 2 ? "time-select":""}><p>{days[2]}</p></div>
                <div onClick={() => setDay(3)} id={day == 3 ? "time-select":""}><p>{days[3]}</p></div>
                <div onClick={() => setDay(4)} id={day == 4 ? "time-select":""}><p>{days[4]}</p></div>
                <div onClick={() => setDay(5)} id={day == 5 ? "time-select":""}><p>{days[5]}</p></div>
                <div onClick={() => setDay(6)} id={day == 6 ? "time-select":""}><p>{days[6]}</p></div>
            </div>
            <MenuDisplay open day={myGetDay()} name = "Breakfast" time="7:00am - 9:00am"/>
            <MenuDisplay day={myGetDay()} name = "Lunch" time="7:00am - 9:00am"/>
            <MenuDisplay day={myGetDay()} name = "Snack" time="7:00am - 9:00am"/>
            <MenuDisplay day={myGetDay()} name = "Dinner" time="7:00am - 9:00am"/>

            
        </div>
    );
}

export default Home;