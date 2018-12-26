chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		
		function responseOptions (option) {
			var response = new Object();
			response[option] = localStorage[option];
			if (request.localstorage == option) {
				sendResponse(response);
			}
			else
				sendResponse({}); 
		};
		
		if (request.localstorage == "kicked") {
			sendResponse({kicked: (localStorage.kicked||"")});
		}
		else if (request.localstorage == "set") {
					localStorage['kicked']=request.settedValue; 
					sendResponse({status:'ok'}); 
				}
				else responseOptions(request.localstorage);
});

chrome.browserAction.setBadgeText({text:"123"})
chrome.browserAction.setBadgeBackgroundColor({color:"#00FF00"})

function setTextOnBadge(textOnBadge)
{

}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "ratingChanged":
            chrome.browserAction.setBadgeText({ text: String(request.data.ratingValue)});
        break;
    }
    return true;
});



/*

*/