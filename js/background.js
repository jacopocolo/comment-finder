//TODO: talk to popup.js: https://stackoverflow.com/questions/15967023/passing-var-from-background-js-to-popup-js

//why carrots? ¯\_(ツ)_/¯
var carrots = [];
var popups = chrome.extension.getViews({type: "popup"});

function resetBadge() {
  chrome.browserAction.setBadgeBackgroundColor({
    color: [255, 0, 0, 0]
  });
  chrome.browserAction.setBadgeText({
    text: "0"
  });
}

chrome.runtime.onMessage.addListener(
  function(request) {
    var totalComments = request.html.length + request.css.length + request.js.length;
    if (totalComments > 0) {
      console.log(request)
      chrome.browserAction.setBadgeBackgroundColor({
        color: [255, 0, 0, 255]
      });
      chrome.browserAction.setBadgeText({
        text: totalComments.toString()
      });
      //push the whole objest to the array
      carrots.push(request);
      //populate the popup usng the last element added in the array
      updatePopup(carrots.length-1);
    } else {
      resetBadge();
    }
  });

chrome.tabs.onActivated.addListener(function(info) {
  resetBadge();
  var tab = chrome.tabs.get(info.tabId, function(tab) {
    for (x = 0; x < carrots.length; x++) {
      if (carrots[x].url == tab.url) {
        updatePopup(x);
        var totalComments = carrots[x].html.length + carrots[x].css.length + carrots[x].js.length;
        chrome.browserAction.setBadgeBackgroundColor({
          color: [255, 0, 0, 255]
        });
        chrome.browserAction.setBadgeText({
          text: totalComments.toString()
        });
      }
    };
  });
});

function updatePopup(index) {
  //popups[0].document.getElementById('comments').innerHTML = carrots[index].html[1];
};
