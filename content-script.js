doInject();

function doInject() {
    var scriptElement;
    scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = chrome.runtime.getURL('activate-hover.js');
    // document.addEventListener('deconDataEvent', function (event) {
    //     initRestylingInterface(event.detail);
    // });
    document.body.appendChild(scriptElement);
}