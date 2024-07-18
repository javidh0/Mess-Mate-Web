let login = {
    status : false,
    auth : {},
};

function setLogin(val) {
    login["status"] = val["status"];
    login["auth"] = val["auth"];
    console.log("from auth data");
    console.log(login);
}

export {login, setLogin};
