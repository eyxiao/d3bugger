window.addEventListener("load", doInject, false);

var port = chrome.runtime.connect();

window.addEventListener("message", function (event) {
    // console.log("got message in content-script");
    if (event.source == window) {
        if (event.data.type && (event.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT")) {
            // send to extension/background
            chrome.runtime.sendMessage(event.data);
            // console.log("sent message from content-script");
        }
    }
})

// Listen for messages from background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.name === "updateSelectionType") {
        console.log("received message in content-script to update selection type to " + message.message);
        window.postMessage(message);
        console.log("sent message to activate-hover injected");
    }
});

function doInject() {
    var jsInitChecktimer = setInterval(checkForSVG, 111);

    function checkForSVG() {
        console.log("waiting for SVG Graphic Element to load...")
        var svgLoaded = checkForSVGGraphicElement();
        if (svgLoaded) {
            console.log("SVG Graphic Element found!")
            clearInterval(jsInitChecktimer);
            var scriptElement;
            scriptElement = document.createElement('script');
            scriptElement.type = 'text/javascript';
            scriptElement.src = chrome.runtime.getURL('activate-hover-bundled.js');
            return document.body.appendChild(scriptElement);
        }
    }
}

function checkForSVGGraphicElement() {
    var foundElement = false;
    let svgGraphicsElements = ["circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "use"]
    svgGraphicsElements.forEach((element, i) => {
        if (document.querySelector(element)) {
            console.log("found " + element);
            foundElement = true;
        }
    })
    return foundElement;
}