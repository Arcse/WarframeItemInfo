$(document).ready(function () {
    let courseName = getCourseName(courseCode);
    let courseNumber = getCourseNumber(courseCode);
    // getCourseInfo(courseName, courseNumber);
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

// function getCourseInfo(courseName, courseNumber){
// }