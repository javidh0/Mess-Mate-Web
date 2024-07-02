import axios from "axios";

// {
//     "auth" : {
//         "user_id" : "mm1632",
//         "password" : "Javidh"
//     }
// }

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
        "http://localhost:1729/login",
        body
    );

    return x;
}

export default loginApi;