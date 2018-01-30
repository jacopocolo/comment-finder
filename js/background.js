//TODO:
//loading multiple pages at once still displays the wrong item

//why carrots? ¯\_(ツ)_/¯
var carrots = [];
var popups = chrome.extension.getViews({
  type: "popup"
});

function resetBadge() {
  chrome.browserAction.setBadgeBackgroundColor({
    color: [255, 0, 0, 0]
  });
  chrome.browserAction.setBadgeText({
    text: "0"
  });
}

//Used by the activated, the load-complete reports and send message functions
var currentTab;


//SET THE BADGE PROPERLY FUNCTIONS

//If the page is activated
//On newtabs, this triggers chrome://newtab/ and NOT the url you are entering
//So the only solution is to rely on load-complete reports
chrome.tabs.onActivated.addListener(function(info) {
  resetBadge();
  var tab = chrome.tabs.get(info.tabId, function(tab) {
    currentTab = tab.url;
    for (x = 0; x < carrots.length; x++) {
      if (carrots[x].url == tab.url) {
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

//Load-complete reports
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    //We ask Chrome what's the current tab
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function(tabs) {
      currentTab = tabs[0].url;
      tabJustCompleted = tab.url;

      if (currentTab == tabJustCompleted) {
        for (x = 0; x < carrots.length; x++) {

          if (carrots[x].url == currentTab) {
            var totalComments = carrots[x].html.length + carrots[x].css.length + carrots[x].js.length;
            chrome.browserAction.setBadgeBackgroundColor({
              color: [0, 0, 255, 255]
            });
            chrome.browserAction.setBadgeText({
              text: totalComments.toString()
            });
          }

        };
      }
    });
  }
});

//SEND THE COMMENTS TO POPUP

chrome.runtime.onMessage.addListener(
  function(msg, sender, sendResponse) {
    if (msg.html) {
      var totalComments = msg.html.length + msg.css.length + msg.js.length;
      if (totalComments > 0) {
        //push msg in the array making sure we are not storig copies
        //Check if the array has something inside
        if (carrots.length > 0) {
          //if it does loop through it and see if we have this url already
          for (x = 0; x < carrots.length; x++) {
            if (carrots[x].url == msg.url) {
              //if we do, override the array element
              carrots[x] = msg;
              return
            } else {
              //If we don’t add this to the array
              carrots.push(msg)
              return
            }
          }
          //If the array has 0 entries, add the first one and set the badge
        } else {
          carrots.push(msg)
          chrome.browserAction.setBadgeBackgroundColor({
            color: [255, 0, 0, 255]
          });
          chrome.browserAction.setBadgeText({
            text: totalComments.toString()
          });
        };
      } else {
        resetBadge();
      }
    }

    if (msg.method == "getComments") {
      for (x = 0; x < carrots.length; x++) {
        if (carrots[x].url == currentTab) {
          sendResponse(carrots[x]);
        }
      }
    }
  });

//What object should I send?
//I need:
//Url OK
//Comments OK
//Comments source: ???
