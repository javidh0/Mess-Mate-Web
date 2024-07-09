import axios from "axios";

// {
//     "auth" : {
//         "user_id" : "mm1632",
//         "password" : "Javidh"
//     }
// }

const api_root = "http://localhost:1729/";

async function loginApi(user_id, password){
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        "auth" : {
            "user_id" : user_id,
            "password" : password
        }
    };

    console.log(body);

    let x = await axios.post(
        api_root+"login",
        body
    );

    return x;
}

export default loginApi;