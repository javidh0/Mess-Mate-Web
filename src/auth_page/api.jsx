import axios from "axios";

// {
//     "auth" : {
//         "user_id" : "mm1632",
//         "password" : "Javidh"
//     }
// }

const api_root = "http://localhost:1729/";

async function loginApi(){
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        "auth" : {
            "user_id" : "mm1632",
            "password" : "Javidh"
        }
    };

    let x = await axios.post(
        api_root+"login",
        body
    );

    return x;
}

export default loginApi;