import React, { useState, useEffect } from "react";
import { RiContactsLine } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import "./home.css";
import "../app.css"
import { useNavigate } from "react-router-dom";
import {login, setLogin} from "../auth_data/auth_data";
import { getFoodByDay, getFoodById } from "./api";

function MenuCard(props) {
    return (
        <div className="card">
            <img src="https://firebasestorage.googleapis.com/v0/b/srm-mess-app.appspot.com/o/mess-mate-web-img%2Fdosa.jpg?alt=media&token=c074201e-698e-48b8-986e-41178eb72819" alt="" />
            <div>
                <h4>{props.name}</h4>
                <p>Overall Rating {props.rate}</p>
            </div>
        </div>
    );
}

async function builder(lstOfFoods) {
    let tr = [];
    let n = lstOfFoods.length;
    console.log(lstOfFoods);
    console.log(n);

    for(var i=0; i<n; i++) {
        let id = lstOfFoods[i];
        let temp = await getFoodById(id, login['auth']['token']);
        tr.push(<MenuCard name={temp['name']} rate="4.5"/>);
    }
    return tr;
}

function MenuDisplay(props) {

    console.log("Menu display");
    const [open, setOpen] = useState(props.open);
    const [style, setStyle] = useState({});
    const [builds, setBuilds] = useState([]);


    function onClickHandle(){
        setOpen(!open);
        setStyle({});
    }

    useEffect(() => {
        async function util(){
            let x = await builder(props.lstOfFoods);
            setBuilds(x);
        };
        util();
    }, []);

    return (
        <div className="menu-display">
            <h2 onClick={onClickHandle}> 
                {open ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> }
                {props.day} {props.name}
            </h2>
            {open && <p className="fade-in">Time : {props.time}</p>}
            {open && <div className="Scroll fade-in" style={style}> {builds} </div>}
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

function Home(){
    const navigate = useNavigate();

    let date = new Date();

    const [day, setDay] = useState(date.getDay());
    const [disOptions, setDisOptions] = useState(false);
    const [lstOfFoods, setLstOfFoods] = useState([]);

    useEffect(() => {if(!login['status']) {
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
        setLogin({
            "status" : false,
            "auth" : {}
        })
        navigate("/login");
    }

    useEffect(() => {
        async function apiUtil(){
            let temp = await getFoodByDay(day, login['auth']['token']);
            setLstOfFoods(temp['ids']);
        }
        apiUtil();
    }, [day]);

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
            <MenuDisplay dummy = {day} lstOfFoods = {lstOfFoods} open day={myGetDay()} name = "Breakfast" time="7:00am - 9:00am"/>
            <MenuDisplay dummy = {day} lstOfFoods = {lstOfFoods} day={myGetDay()} name = "Lunch" time="7:00am - 9:00am"/>
            <MenuDisplay dummy = {day} lstOfFoods = {lstOfFoods} day={myGetDay()} name = "Snack" time="7:00am - 9:00am"/>
            <MenuDisplay dummy = {day} lstOfFoods = {lstOfFoods} day={myGetDay()} name = "Dinner" time="7:00am - 9:00am"/>
        </div>
    );
}

export default Home;