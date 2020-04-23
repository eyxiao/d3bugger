// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.
//
// In this example, messages are JSON objects
// {
//   action: ['code'|'script'|'message'], // What action to perform on the inspected page
//   content: [String|Path to script|Object], // data to be passed through
//   tabId: [Automatically added]
// }

(function createChannel() {
    //Create a port with background page for continous message communication
    var port = chrome.extension.connect({
        name: "Sample Communication" //Given a Name
    });

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {

        if (message.hasOwnProperty("tag")) {
            updateTag(message.tag)
        };
        if (message.hasOwnProperty("attributes")) {
            updateAttributes(message.attributes)
        };
        if (message.hasOwnProperty("ancestry")) {
            updateAncestry(message.ancestry)
        };

    });

}());

function updateTag(messageTag) {
    let tag = JSON.parse(messageTag);
    document.getElementById('display-tag').innerHTML = "<b>&lt;" + tag["tag"] + "&gt;</b>";

}

function updateAttributes(messageAttributes) {
    let attributes = JSON.parse(messageAttributes);
    document.getElementById('display-attributes').innerHTML = ""; //clear first

    for (var key of Object.keys(attributes)) {
        let newDiv = document.createElement("div");
        let fullEntry = "<b>" + key + "</b> = " + attributes[key];
        newDiv.innerHTML = fullEntry;
        document.getElementById('display-attributes').appendChild(newDiv);
    }
}

function updateAncestry(messageAncestry) {
    let ancestry = JSON.parse(messageAncestry)
    document.getElementById('display-ancestry').innerHTML = "";

    for (var key of Object.keys(ancestry)) {
        let newDiv = document.createElement("div");
        newDiv.id = "ancestor-" + key;
        newDiv.style.marginLeft = key + "rem";
        newDiv.textContent = ancestry[key];
        document.getElementById('display-ancestry').appendChild(newDiv);
    }
}


// This sends an object to the background page 
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
}