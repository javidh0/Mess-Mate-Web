import axios from "axios";

// {
//     "auth" : {
//         "user_id" : "mm1632",
//         "password" : "Javidh"
//     }
// }

// {
//     "data" : {
//         "user_id" : "jj7707",
//         "password" : "pass",
//         "user_name" : "Javidh",
//         "email" : "jj7707@gmail.com"
//     }
// }

const api_root = "https://mess-app-api.vercel.app/";

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


    let x = await axios.post(
        api_root+"login",
        body
    );

    return x.data;
}

async function signUpApi(data){
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        "data" : data
    };
    
    let x = await axios.post(api_root+"new_user", body);
    return x.data;
}

export {signUpApi, loginApi};
