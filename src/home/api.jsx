import axios from "axios";

var api_root = "https://mess-app-api-k5iz.vercel.app//food?"

// headers: {'Authorization': `Bearer ${token}`} food_meal

async function getFoodByDayMeal(day, meal, token){
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    };

    let api_root_temp = `https://mess-app-api-k5iz.vercel.app/food_meal?day=${day}&meal=${meal}`; 

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

async function getFoodById(id, user_id, token){
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    };

    const api_root_temp = `https://mess-app-api-k5iz.vercel.app/food?user_id=${user_id}&id=${id}`;

    var temp = await axios.get(api_root_temp, body);
    
    return temp.data;
}

async function updateRating(food_id, user_id, rating, token){
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    };

    console.log(body);

    const api_ = `https://mess-app-api-k5iz.vercel.app/update_rating?food_id=${food_id}&user_id=${user_id}&rating=${rating}`

    var temp = await axios.post(api_, {}, body);
    
    return temp.data;
}

export {getFoodByDay, getFoodById, getFoodByDayMeal, updateRating};