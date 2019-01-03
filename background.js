let buttonState = localStorage.buttonState || "off";

chrome.browserAction.onClicked.addListener(function (tab) {
    if (buttonState === "on") {
        localStorage.buttonState = "off";
        buttonState = localStorage.buttonState;
    } 

    else if (buttonState === "off") {
        localStorage.buttonState = "on";
        buttonState = localStorage.buttonState;
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && buttonState === "on") {
        chrome.tabs.executeScript(tab.id, {file: 'createGoogleCard.js'});
    }
});