$(document).ready(function () {
    let courseName = getCourseName(courseCode);
    let courseNumber = getCourseNumber(courseCode);
    let courseInfo = getCourseInfo(courseName, courseNumber);
    if (courseInfo === null){
        alert("course not found")
    }
    else{
        console.log(courseInfo);
    }
});

function getCourseName(courseCode){
    let courseName = "";
    for (let i = 0; i < courseCode.length; i++) {
        if (/[a-zA-Z]/.test(courseCode.charAt(i))){
            courseName += courseCode.charAt(i);
        }
        else {
            break;
        }
    }
    return courseName;
}

function getCourseNumber(courseCode){
    for (let i = 0; i < courseCode.length; i++) {
        if (/[0-9]/.test(courseCode.charAt(i))){
            return courseCode.substring(i);
        }   
    }
}


function getCourseInfo(courseName, courseNumber){
    let data = null;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        'async': false,
        url: "https://api.uwaterloo.ca/v2/courses/" + courseName + "/" + courseNumber + ".json?key=8ac2f9b6a0c4f5ba67b8fd43ba2d899a",
        success: function (response) {
            if (response.meta.message === "Request successful"){
                data = response.data;
            }
        }
    });
    return data;
}