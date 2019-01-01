chrome.browserAction.onClicked.addListener(buttonClicked);

let currentState = localStorage.currentState || "true";

function buttonClicked(tab) {

    if (currentState === "true") {
        localStorage.currentState = "false";
        currentState = localStorage.currentState;
        chrome.tabs.query({}, function (tabs) {
            for (let i = 0; i < tabs.length; i++) {
                // chrome.browserAction.setIcon({
                //     path : "images/cat_logo-32x.png"
                //   });
                // execute(tabs[i]);
            }
        });
    } 

    else if (currentState === "false") {
        localStorage.currentState = "true";
        currentState = localStorage.currentState;

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            for (let i = 0; i < tabs.length; i++) {
                // chrome.browserAction.setIcon({
                //     path : "images/warframe_logo-32x.png"
                //  });
                // execute(tabs[i]);

            }
        });
    }
}


// function execute(tab) {
//     if (!/.*google\....?\/search\?.*/.test(tab.url)) {
//         chrome.tabs.executeScript(tab.id, {file: 'content.js'});
//     }

// }