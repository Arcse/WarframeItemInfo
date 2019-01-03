$(document).ready(function () {
    let url = location.search.substr(1).split("&");
    

    if(/[a-zA-Z]{2,}\+?[0-9]{3}[a-zA-Z]?/.test(queryDict["q"])){
        getInfo(queryDict["q"].replace("+", ""));
    }
});