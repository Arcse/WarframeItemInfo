let buttonState = localStorage.buttonState || "off";

var on = {
    type: "basic",
     title: "Waterloo Course Info", 
     message: "Enabled", 
     iconUrl: "images/UWYellow128x.png",
     silent: true,

}

var off = {
    type: "basic",
     title: "Waterloo Course Info", 
     message: "Disabled", 
     iconUrl: "images/UWYellow128x.png",
     silent: true,
}

chrome.browserAction.onClicked.addListener(function (tab) {
    if (buttonState === "on") {
        localStorage.buttonState = "off";
        buttonState = localStorage.buttonState;
        chrome.notifications.create(off);
        // chrome.browserAction.setIcon({path:"images/UWWhite128x.png"});
    } 

    else if (buttonState === "off") {
        localStorage.buttonState = "on";
        buttonState = localStorage.buttonState;
        chrome.notifications.create(on);
        // chrome.browserAction.setIcon({path:"images/UWYellow128x.png"});
    }
});



chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (buttonState === "on" && changeInfo.status === 'complete' && /.*google\....?\/search\?.*/.test(tab.url)){
        var query = tab.url.substr(1).split("&");
        var userInput = query[1].slice(query[1].indexOf("=") + 1);
        if (/^[a-zA-Z]{2,}\+?[0-9]{3}[a-zA-Z]?$/.test(userInput)) {
            chrome.tabs.executeScript(tab.id, 
                // Setting paremeter before execution of JS file
                {code: 'var courseCode = ' + JSON.stringify(userInput)}, 
                function() {
                    // Executing the JS file.
                    chrome.tabs.insertCSS(tab.id, {file:"dependencies/bootstrap-4.2.1-dist/bootstrap.min.css"})
                    chrome.tabs.executeScript(tab.id, {file: "scripts/createCard.js"});
            });
        }
    }
});