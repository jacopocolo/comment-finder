//TODO:
//loading multiple pages at once still displays the wrong item

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

var currentTab;

//When a page has completed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //We check if the load is completed
  if (changeInfo.status == 'complete') {
  tabJustCompleted = tab.url;
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        /*console.log("tab just finished loading: "+tab.url)
        console.log("current active tab: "+tabs[0].url)*/
        currentTab = tabs[0].url;
    });
    //We check if the currentTab matches the url of the tab that just reported
    //the complete status. If it does, it means that we are on the right tab.
    //If it doesn't, it means that the tab has finished loading in the background
    if (tabJustCompleted == currentTab) {
      for (x = 0; x < carrots.length; x++) {
        if (carrots[x].url == currentTab) {
          var totalComments = carrots[x].html.length + carrots[x].css.length + carrots[x].js.length;
          chrome.browserAction.setBadgeBackgroundColor({
            color: [255, 0, 0, 255]
          });
          chrome.browserAction.setBadgeText({
            text: totalComments.toString()
          });
        }
      };
    };
  }
})

//If the page is activated
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

chrome.runtime.onMessage.addListener(
  function(msg, sender, sendResponse) {
    if (msg.html) {
    var totalComments = msg.html.length + msg.css.length + msg.js.length;
    if (totalComments > 0) {
      chrome.browserAction.setBadgeBackgroundColor({
        color: [255, 0, 0, 255]
      });
      chrome.browserAction.setBadgeText({
        text: totalComments.toString()
      });
      //push msg in the array making sure we are not storig copies
      //Check if the array has something inside
      if (carrots.length>0) {
        //if it does loop through it and see if we have this url already
        for (x=0;x<carrots.length;x++) {
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
        //If the array has 0 entries, add the first one
      } else {carrots.push(msg)};
    } else {
      resetBadge();
    }
  }
    if(msg.method == "getComments") {
            for (x=0; x<carrots.length; x++) {
                if (carrots[x].url == currentTab) {
                  sendResponse(carrots[x]);
                }
            }
    }
  });
