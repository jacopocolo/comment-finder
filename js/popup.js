var currentTab;

chrome.tabs.query({active : true, currentWindow: true}, function (tabs) {
    currentTab = tabs[0].url;
});

chrome.runtime.sendMessage({method:"getComments"},function(response){
  for (x = 0; x < response.length; x++) {
    console.log(response);
    if (response[x].url == currentTab) {
      $('#comments').text(response[x].html[0]);
    }
  };
});
