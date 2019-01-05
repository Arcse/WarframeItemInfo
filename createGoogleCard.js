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
                let div = document.createElement("div");
                div.className = "bootstrap";
                let card = createCard(response.data);
                div.append(card);
                $("#topstuff").append(div);
                console.log(response.data);
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
    // card.setAttribute("style", "margin-bottom: 15px;");

    let content = document.createElement("div");
    content.className = "tab-content";

    let label = document.createElement("div");
    label.className = "card-footer";

    let label_text = document.createElement("small");
    label_text.className = "text-muted";
    label_text.innerText = "Provided by Waterloo Course Info Chrome Extension. Not affiliated with University of Waterloo or Google.";

    createHeader(content, data);
    // createOverview(content, data);
    // createRequisites(content, data);
    // createMoreInfo(content, data);
    card.append(content);
    card.append(label);
    label.append(label_text);
    return card;
}

function createHeader(content, data) {
    let header = document.createElement("div");
    header.className = "card-header";

    let title = document.createElement("h5");
    title.className = "card-title";
    title.innerText = data.subject.toUpperCase() + " " + data.catalog_number + ": " + data.title;

    let subtitle = document.createElement("h6");
    subtitle.className = "card-subtitle mb-2 text-muted";
    subtitle.innerText = data.academic_level.charAt(0).toUpperCase() + data.academic_level.slice(1) + " Course";

    header.append(title);
    header.append(subtitle);
    content.append(header);
}

// function createOverview(parent, code, info) {
//     let textbooks = document.createElement("a");
//     textbooks.className = "btn btn-primary";
//     textbooks.setAttribute("href", "http://murad-akh.ca/uoftbooks/cinfo/index.html?filter?q=course_code:%22" + code + "%22");
//     textbooks.innerText = "View Textbooks";

//     let exams = document.createElement("a");
//     exams.className = "btn btn-primary";
//     exams.setAttribute("style", "margin-left: 10px;");
//     exams.setAttribute("href", "https://exams-library-utoronto-ca.myaccess.library.utoronto.ca/simple-search?location=%2F&query=" + code);
//     exams.innerText = "View Past Exams";

//     let description_element = document.createElement("p");
//     description_element.className = "card-text";
//     description_element.innerText = info.description;

//     parent.append(description_element);
//     parent.append(textbooks);
//     parent.append(exams);
// }

// function createRequirements(parent, code, info) {
//     const format = new RegExp('[A-Z][A-Z][A-Z][1-4a-d][0-9][0-9]', 'mgi');

//     let prerequisites = document.createElement("p");
//     prerequisites.className = "card-text";
//     prerequisites.innerHTML = "Prerequisites: " + info.prerequisites.replace(format, replace);

//     let exclusions = document.createElement("p");
//     exclusions.className = "card-text";
//     exclusions.innerHTML = "Exclusions: " + info.exclusions.replace(format, replace);

//     let breadths = document.createElement("p");
//     breadths.className = "card-text";
//     breadths.innerHTML = "Breadths: " + info.breadths;

//     parent.append(prerequisites);
//     parent.append(exclusions);
//     parent.append(breadths);
// }

// function createOfferings(parent, code, info) {
//     let utsg = document.createElement("p");
//     utsg.className = "card-text";
//     utsg.innerHTML = "UTSG: " + sessionToLinks(info.crawled.sessions.utsg);

//     let utsc = document.createElement("p");
//     utsc.className = "card-text";
//     utsc.innerHTML = "UTSC: " + sessionToLinks(info.crawled.sessions.utsc);

//     let utm = document.createElement("p");
//     utm.className = "card-text";
//     utm.innerHTML = "UTM: " + sessionToLinks(info.crawled.sessions.utm);

//     parent.append(utsg);
//     parent.append(utsc);
//     parent.append(utm);
// }

// function createInstructors(parent, code, info) {
//     let utsg = document.createElement("p");
//     utsg.className = "card-text";
//     utsg.innerHTML = "UTSG: " + info.crawled.profs.utsg.join(', ');

//     let utsc = document.createElement("p");
//     utsc.className = "card-text";
//     utsc.innerHTML = "UTSC: " + info.crawled.profs.utsc.join(', ');

//     let utm = document.createElement("p");
//     utm.className = "card-text";
//     utm.innerHTML = "UTM: " + info.crawled.profs.utm.join(', ');

//     parent.append(utsg);
//     parent.append(utsc);
//     parent.append(utm);

// }

