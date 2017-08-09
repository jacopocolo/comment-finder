chrome.runtime.onMessage.addListener(
    function(request) {
      var totalComments = request.html.length+request.css.length+request.js.length;
      if (totalComments>0) {
        console.log(request)
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
        chrome.browserAction.setBadgeText({text: totalComments.toString()});
        } else {
          chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 0] });
          chrome.browserAction.setBadgeText({text: "0"})}
    }
);

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    chrome.runtime.sendMessage(tab);
      chrome.tabs.getSelected(null, function(tab) {
      });
    });
