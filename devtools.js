// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("D3 Debugger", "toast.png", "panel.html", function (panel) { });