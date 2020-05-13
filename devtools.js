// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("D3 Debugger", "img/icon48.png", "panel.html", function (panel) { 
    var _window; // reference to panel.html's window

    // Get panel window
    panel.onShown.addListener(function (panelWindow) {
        panelWindow instanceof Window;
        _window = panelWindow;
    });

    // Create a connection to the background page
    var port = chrome.runtime.connect({name: "devtools"});

    // Initial message on connecting
    port.postMessage({
        name: 'init',
        tabId: chrome.devtools.inspectedWindow.tabId,
        source: 'devtools.js'
    });

    // Listen for messages from background, and update panel's info with message received
    port.onMessage.addListener(function (message) {
        chrome.devtools.inspectedWindow.eval(`console.log("wtf received message from ${message.source} in devtools");`);
        chrome.devtools.inspectedWindow.eval(`console.log(${JSON.stringify(message)});`);
        chrome.devtools.inspectedWindow.eval(`console.log("hello??????");`);

        if (_window) {
            chrome.devtools.inspectedWindow.eval(`console.log("updating panel...");`);
            _window.updatePanel(message);
        } else {
            chrome.devtools.inspectedWindow.eval(`console.log("WHAT THE HECK");`);
        } 

    });
});