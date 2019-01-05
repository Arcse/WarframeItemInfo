$(document).ready(function () {
    let courseName = getCourseName(courseCode);
    let courseNumber = getCourseNumber(courseCode);
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "https://api.uwaterloo.ca/v2/courses/" + courseName + "/" + courseNumber + ".json?key=8ac2f9b6a0c4f5ba67b8fd43ba2d899a",
        success: function (response) {
            if (response.meta.message === "Request successful"){
                $(".card-section").parent().remove();
                let bootstrap = document.createElement("div");
                bootstrap.className = "bootstrapiso";
                let card = createCard(response.data);
                bootstrap.append(card);
                $("#topstuff").append(bootstrap);
            }
        }
    });
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

function createCard(data) {
    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute("style", "margin-bottom: 15px;");

    let header = document.createElement("div");
    header.className = "card-header";

    let content = document.createElement("div");
    content.className = "card-body";

    let label = document.createElement("div");
    label.className = "card-footer";

    let label_text = document.createElement("small");
    label_text.className = "text-muted";
    label_text.innerText = "Provided by Waterloo Course Info Chrome Extension.";

    addHeader(header, data);
    addInfo(content, data);
    addLinks(content, data)
    card.append(header);
    card.append(content);
    card.append(label);
    label.append(label_text);
    return card;
}

function addHeader(header, data) {

    let title = document.createElement("h5");
    title.className = "card-title";
    title.innerText = data.subject.toUpperCase() + " " + data.catalog_number + ": " + data.title;

    let subtitle = document.createElement("h6");
    subtitle.className = "card-subtitle";
    subtitle.innerText = data.academic_level.charAt(0).toUpperCase() + data.academic_level.slice(1) + " Course";

    header.append(title);
    header.append(subtitle);
}

function addInfo(content, data) {

    let description = document.createElement("h5");
    description.className = "card-text";
    description.innerText = (data.description || "None");
    if (description.innerText !== "None"){
        description.innerText = data.description.slice(0, data.description.indexOf("["));
    }

    let units = document.createElement("h6");
    units.className = "card-text";
    units.innerText = "Units: " + (data.units || "None");

    let prerequisites = document.createElement("h6");
    prerequisites.className = "card-text";
    prerequisites.innerText = "Prerequisites: " + (data.prerequisites || "None");

    let corequisites = document.createElement("h6");
    corequisites.className = "card-text";
    corequisites.innerText = "Corequisites: " + (data.corequisites || "None");

    let antirequisites = document.createElement("h6");
    antirequisites.className = "card-text";
    antirequisites.innerText = "Antirequisites: " + (data.antirequisites || "None");

    let offerings = document.createElement("h6");
    offerings.className = "card-text";
    offerings.innerText = "Offerings: "
    if (data.terms_offered.length === 0){
        offerings.innerText += "N/A"
    }
    else{
        for (e in data.terms_offered){
            offerings.innerText += (data.terms_offered[e] + ", ")
        }
        offerings.innerText = offerings.innerText.slice(0, offerings.innerText.length - 2);
    }

    content.append(description);
    content.append(units);
    content.append(prerequisites);
    content.append(corequisites);
    content.append(antirequisites);
    content.append(offerings);
}

function addLinks(content, data){
    let source = document.createElement("a");
    source.className = "btn btn-outline-primary";
    source.setAttribute("href", data.url);
    source.innerText = "View Calendar";

    let exams = document.createElement("a");
    exams.className = "btn btn-outline-primary";
    exams.setAttribute("style", "margin-left: 10px;");
    exams.setAttribute("href", "https://uwflow.com/course/" + data.subject.toLowerCase() + data.catalog_number);
    exams.innerText = "View UWFlow";
    
    content.append(source);
    content.append(exams);
}