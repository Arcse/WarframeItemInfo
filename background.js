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
    if (changeInfo.status === 'complete' && buttonState === "on" && /.*google\....?\/search\?.*/.test(tab.url)) {
        alert("updated");
        chrome.tabs.executeScript(tab.id, {file: 'createGoogleCard.js'});
    }
});