// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// 
// Can use:
// chrome.tabs.*
// chrome.runtime.*


var connections = {};

chrome.runtime.onConnect.addListener(function (port) {
    var extensionListener = function (message, sender, sendResponse) {
        // The original connection event doesn't include the tab ID of the DevTools page, so we need to send it explicitly.
        if (message.name == "init") {
          connections[message.tabId] = port;
          console.log("initiated port " + message.source + " " + message.tabId);
          return;
        }
	// other message handling goes here
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    // Remove this end of port if other end disconnects
    port.onDisconnect.addListener(function(port) {
        console.log("port disconnected :(");

        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i=0; i < tabs.length; i++) {
            console.log(tabs[i]);
            console.log(connections[tabs[i]]);
            console.log(connections[tabs[i]].name);
            if (connections[tabs[i]] == port) {
                delete connections[tabs[i]]
                break;
            } else {
                console.log("port not found");
            }
        }
    });
});

// Receive message from content script and relay to the devTools page for the current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("received message in background.js");
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
        var tabId = sender.tab.id;
        if (tabId in connections) {
            connections[tabId].postMessage(request);
            console.log("sent message from background to devTools, port " + tabId);
        } else {
            console.log("Tab not found in connection list.");
        }
    } else {
    console.log("sender.tab not defined.");
    }
    return true;
});