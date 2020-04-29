doInject();

var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
    // console.log("got message in content-script");
    if (event.source == window) {
        if (event.data.type && (event.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT")) {
            // send to extension/background
            chrome.runtime.sendMessage(event.data);
            // console.log("sent message from content-script");
        }
    }
})

function doInject() {
    var scriptElement;
    scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = chrome.runtime.getURL('activate-hover-bundled.js');
    return document.body.appendChild(scriptElement);
}