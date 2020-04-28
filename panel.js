// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.runtime.*


// Function called in devtools.js
function updatePanel(msg) {
    var message = msg.message;
    console.log(":HELLO");
    chrome.devtools.inspectedWindow.eval(`console.log(${message.tag});`);

    if (message.hasOwnProperty("tag")) {
        updateTag(message.tag);
    };
    if (message.hasOwnProperty("attributes")) {
        updateAttributes(message.attributes);
    };
    if (message.hasOwnProperty("ancestry")) {
        updateAncestry(message.ancestry);
    };
    if (message.hasOwnProperty("data")) {
        updateData(message.data);
    };
}

function updateTag(messageTag) {
    let tag = JSON.parse(messageTag);
    document.getElementById('display-tag').innerHTML = "<b>&lt;" + tag["tag"] + "&gt;</b>";
}

function updateAttributes(messageAttributes) {
    let attributes = JSON.parse(messageAttributes);
    document.getElementById('display-attributes').innerHTML = ""; //clear first

    for (var key of Object.keys(attributes)) {
        let newDiv = document.createElement("div");
        let fullEntry = "<div class='entry'> <span class='attribute'>" + key + "</span> : " + attributes[key] + "</div>";
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

function updateData(messageData) {
    let data = JSON.parse(messageData);
    document.getElementById('display-data').innerHTML = "";

    for (var key of Object.keys(data)) {
        let newDiv = document.createElement("div");
        let fullEntry = "<div class='entry'> <span class='attribute'>" + key + "</span> : " + JSON.stringify(data[key]) + "</div>";
        newDiv.innerHTML = fullEntry;
        document.getElementById('display-data').appendChild(newDiv);
    }
}
