$(document).ready(function () {
    let query = location.search.substr(1).split("&");
    let courseCode = query[1].slice(query[1].indexOf("=") + 1);
    alert(courseCode);
    if(/[a-zA-Z]{2,}\+?[0-9]{3}[a-zA-Z]?/.test(courseCode)){
        getInfo(courseCode);
    }
});

function getInfo(courseCode){
    document.body.style.background = 'green'
}