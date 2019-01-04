let buttonState = localStorage.buttonState || "off";

chrome.browserAction.onClicked.addListener(function (tab) {
    if (buttonState === "on") {
        localStorage.buttonState = "off";
        buttonState = localStorage.buttonState;
        alert("extension is off");
    } 

    else if (buttonState === "off") {
        localStorage.buttonState = "on";
        buttonState = localStorage.buttonState;
        alert("extension is on");
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && buttonState === "on" && /.*google\....?\/search\?.*/.test(tab.url)){
        var query = tab.url.substr(1).split("&");
        var userInput = query[1].slice(query[1].indexOf("=") + 1);
        if (/^[a-zA-Z]{2,}\+?[0-9]{3}[a-zA-Z]?$/.test(userInput)) {
            chrome.tabs.executeScript(tab.id, 
                // Setting paremeter before execution of JS file
                {code: 'var courseCode = ' + JSON.stringify(userInput)}, 
                function() {
                    // Executing the JS file.
                    chrome.tabs.executeScript(tab.id, {file: "createGoogleCard.js"});
                    chrome.tabs.executeScript(tab.id, {file: "fillGoogleCard.js"});
            });
        }
    }
});