import React, { useState, useEffect } from "react";
import { RiContactsLine } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import "./home.css";
import "../app.css"
import { useNavigate } from "react-router-dom";
import {login, setLogin} from "../auth_data/auth_data";
import { getFoodByDay, getFoodById, getFoodByDayMeal } from "./api";

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

    for(var i=0; i<n; i++) {
        let id = lstOfFoods[i];
        let temp = await getFoodById(id, login['auth']['token']);
        tr.push(<MenuCard name={temp['name']} rate={temp['rating']}/>);
    }
    return tr;
}

function MenuDisplay(props) {
    const open = props.open; 
    const setOpen = props.setOpen;
    const [style, setStyle] = useState({});
    const [builds, setBuilds] = useState([]);

    function onClickHandle(){
        if(open == false) setOpen(true);
        else setOpen(false);
        setStyle({});
    }

    useEffect(() => {
        async function util(){
            let x = await builder(props.lstOfFoods);
            setBuilds(x);
        };
        util();
    }, []);

    useEffect(() => {
        async function util(){
            let x = await builder(props.lstOfFoods);
            setBuilds(x);
        };
        util();
    }, [open]);

    return (
        <div className="menu-display">
            <h2 onClick={onClickHandle}> 
                {open == true ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> }
                {props.day} {props.name}
            </h2>
            {open == true && <p className="fade-in">Time : {props.time}</p>}
            {open == true && <div className="Scroll fade-in" style={style}> {builds} </div>}
        </div>
    )
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

function Home(){
    const navigate = useNavigate();

    let date = new Date();

    const [day, setDay] = useState(date.getDay());
    const [disOptions, setDisOptions] = useState(false);
    const [lstOfFoods, setLstOfFoods] = useState([]);

    const [breakFast, setBreakFast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [snack, setSnack] = useState([]);
    const [dinner, setDinner] = useState([]);

    const [dropDownOpens, setDropDownOpens] = useState([false, false, false, false]);

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

    function setOpenHandles(idx, val){
        var temp = [...dropDownOpens];
        temp[idx] = val;
        setDropDownOpens(temp);
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
            setDropDownOpens([false, false, false, false]);
            let temp;
            temp = await getFoodByDayMeal(day, 0, login['auth']['token']); setBreakFast(temp['ids']);
            temp = await getFoodByDayMeal(day, 1, login['auth']['token']); setLunch(temp['ids']);
            temp = await getFoodByDayMeal(day, 2, login['auth']['token']); setSnack(temp['ids']);
            temp = await getFoodByDayMeal(day, 3, login['auth']['token']); setDinner(temp['ids']);
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
            <MenuDisplay lstOfFoods = {breakFast} open = {dropDownOpens[0]} setOpen = {(val) => {setOpenHandles(0, val)}} day_menu={myGetDay()} name = "Breakfast" time="7:00am - 9:00am"/>
            <MenuDisplay lstOfFoods = {lunch} open = {dropDownOpens[1]} setOpen = {(val) => {setOpenHandles(1, val)}} day_menu={myGetDay()} name = "Lunch" time="7:00am - 9:00am"/>
            <MenuDisplay lstOfFoods = {snack} open = {dropDownOpens[2]} setOpen = {(val) => {setOpenHandles(2, val)}} day_menu={myGetDay()} name = "Snack" time="7:00am - 9:00am"/>
            <MenuDisplay lstOfFoods = {dinner} open = {dropDownOpens[3]} setOpen = {(val) => {setOpenHandles(3, val)}} day_menu={myGetDay()} name = "Dinner" time="7:00am - 9:00am"/>
        </div>
    );
}

export default Home;