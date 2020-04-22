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
        // document.getElementById('display-attributes').innerHTML = "";
        // let div = document.createElement("div")
        // div.innerHTML = message.attributeEntry;
        // document.getElementById('display-attributes').append(div);
        if (message.hasOwnProperty("attributes")) {
            updateAttributes(message.attributes)
        };




        // let HTMLentry = message.attributeEntry;
        // console.log(HTMLentry);
        // $("#display-attributes").html(message.attributeEntry);
        // port.postMessage(message);
    });

}());

function updateAttributes(messageAttributes) {
    let attributes = JSON.parse(messageAttributes);
    document.getElementById('display-attributes').innerHTML = ""; //clear first

    for (var key of Object.keys(attributes)) {
        // console.log(key + " -> " + p[key])

        let newDiv = document.createElement("div");
        let fullEntry = "<p><b>" + key + "</b> = " + attributes[key] + "</p>";
        newDiv.innerHTML = fullEntry;
        document.getElementById('display-attributes').appendChild(newDiv);
    }


}



// This sends an object to the background page 
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
}