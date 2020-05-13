// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.runtime.*

// Function called in devtools.js

function updatePanel(msg) {
    var message = msg.message;

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
    document.getElementById('display-tag').innerHTML = "<b> <div class='entry'> &lt;" + tag["tag"] + "&gt;</b>";
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

function ancestryHelper(ancestor) {
    let newDiv = document.createElement("div");
    
}

function updateAncestry(messageAncestry) {
    let ancestry = JSON.parse(messageAncestry)
    document.getElementById('display-ancestry').innerHTML = "";

    for (var key of Object.keys(ancestry)) {
        let outerDiv = document.createElement("div");
        outerDiv.className = "ancestry-container";
        let mainDiv = document.createElement("div");
        mainDiv.style.display = "flex";
        mainDiv.style.paddingLeft = (1 + parseInt(key) * 1.8) + "rem";

        let btn = document.createElement("div");
        btn.id = key;
        btn.innerHTML = "<img src='img/arrow.svg' height='8' width='8'>";
        btn.addEventListener("click", function(){ toggle('hidden-ancestor-' + btn.id, btn.id); });
        btn.style.paddingTop = ".3rem";
        btn.style.paddingRight = ".3rem";
        btn.className = "arrow-left";
        mainDiv.append(btn);

        let newDiv = document.createElement("div");
        newDiv.id = "ancestor-" + key;
        newDiv.className = "ancestor-entry";
        newDiv.innerHTML = `<span class='ancestor'> ${ancestry[key].main} </span>`;
        mainDiv.append(newDiv);

        let attrs = document.createElement("div");
        code = "";
        for (var k of Object.keys(ancestry[key].attributes)) {
            let content = ancestry[key].attributes[k].split("=", 2);
            code = code.concat("<div class='ancestor-attr'> <span class='ancestor-attr-text'>" + content[0] + "</span> : " + content[1] + "</div>");
        }
        code = code.concat("</div>");
        attrs.innerHTML = code;
        attrs.id = `hidden-ancestor-${key}`;
        attrs.style.display = "none";
        attrs.style.marginBottom = ".3rem";
        newDiv.append(attrs);

        outerDiv.append(mainDiv);

        document.getElementById('display-ancestry').appendChild(outerDiv);
    }
}

function toggle(elemId, btnId) {
    var attrs = document.getElementById(elemId);
    var btn = document.getElementById(btnId);
    if (attrs.style.display === "none") {
        attrs.style.display = "block";
        btn.className = "arrow-left open";
    } else {
        attrs.style.display = "none";
        btn.className = "arrow-left";
    }
}

function updateData(messageData) {
    let data = JSON.parse(messageData);
    document.getElementById('display-data').innerHTML = "";
    if (data != null) {
        for (var key of Object.keys(data)) {
            let newDiv = document.createElement("div");
            let fullEntry = "<div class='entry'> <span class='attribute'>" + key + "</span> : <pre id='JSON'>" + JSON.stringify(data[key], undefined, 4) + "</pre> </div>";
            newDiv.innerHTML = fullEntry;
            document.getElementById('display-data').appendChild(newDiv);
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("button-hover").addEventListener("click", function() { updateSelectionType("hover"); });
    document.getElementById("button-click").addEventListener("click", function() { updateSelectionType("click"); });
    document.getElementById("button-off").addEventListener("click", function() { updateSelectionType("off"); });
    document.getElementById("button-highlight").addEventListener("click", function() { 
        // console.log("clicked highlight");
        if ($('input[name="highlight"]:checked').length > 0) {
            // console.log("toggled highlight on");
            updateHighlight("on");
        } else {
            // console.log("toggled highlight off");
            updateHighlight("off");
        }
    });
});


// Send message to update selection type
function updateSelectionType(selectionType) {
    // console.log("got button click... " + selectionType);
    var message = {
        name: "updateSelectionType",
        message: selectionType,
        tabId: chrome.devtools.inspectedWindow.tabId,
        source: "panel.js"
    }
    window.port.postMessage(message);
    // console.log("sent message from panel");
}

// Send message to update highlight state
function updateHighlight(state) {
    var message = {
        name: "updateHighlight",
        message: state,
        tabId: chrome.devtools.inspectedWindow.tabId,
        source: "panel.js"
    }
    window.port.postMessage(message);
}


(function createConnection() {
    // Create a connection to the background page
    window.port = chrome.runtime.connect({name: "panel"});

    // Initial message on connecting
    window.port.postMessage({
        name: 'init',
        tabId: chrome.devtools.inspectedWindow.tabId,
        source: 'panel.js'
    });

    // Listen for messages from background, and update panel's info with message received
    window.port.onMessage.addListener(function (message) {
        // chrome.devtools.inspectedWindow.eval(`console.log("received message from ${message.source} in panel");`);
        // chrome.devtools.inspectedWindow.eval(`console.log(${JSON.stringify(message)});`);
        if (message.message) {
            updatePanel(message);
        }
    });
})();
