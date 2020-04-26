// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*

// document.querySelector('#executescript').addEventListener('click', function () {
//     sendObjectToInspectedPage({ action: "code", content: "console.log('Inline script executed')" });
// }, false);

document.querySelector('#hover-inspector').addEventListener('click', function () {
    const hoverButton = document.querySelector(".btn.btn-secondary");
    if (!hoverButton.classList.contains("active")) {
        sendObjectToInspectedPage({ action: "script", content: "activate-hover.js" });
        document.querySelector('#hover-inspector-label').innerHTML = "Deactivate Hover Inspector";
    }
    else {
        sendObjectToInspectedPage({ action: "script", content: "deactivate-hover.js" });
        document.querySelector('#hover-inspector-label').innerHTML = "Activate Hover Inspector";
    }
    hoverButton.classList.toggle('active');
}, false);

// document.querySelector('#insertmessagebutton').addEventListener('click', function () {
//     sendObjectToInspectedPage({ action: "code", content: "document.body.innerHTML='<button>Send message to DevTools</button>'" });
//     sendObjectToInspectedPage({ action: "script", content: "messageback-script.js" });
// }, false);


chrome.devtools.inspectedWindow.eval("setSelectedElement('hi')",
    { useContentScriptContext: true })