import axios from "axios";

var api_root = "http://localhost:1729/food?"

// headers: {'Authorization': `Bearer ${token}`} food_meal

async function getFoodByDayMeal(day, meal, token){
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    };

    let api_root_temp = `http://localhost:1729/food_meal?day=${day}&meal=${meal}`; 

    var temp = await axios.get(api_root_temp, body);
    console.log(temp.data);
    return temp.data;
}


async function getFoodByDay(day, token){
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    };

    var temp = await axios.get(api_root + `day=${day}`, body);
    return temp.data;
}

async function getFoodById(id, token){
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    };

    var temp = await axios.get(api_root + `id=${id}`, body);
    
    return temp.data;
}

export {getFoodByDay, getFoodById, getFoodByDayMeal};