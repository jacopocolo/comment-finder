var currentTab;

chrome.tabs.query({active : true, currentWindow: true}, function (tabs) {
    currentTab = tabs[0].url;
});

chrome.runtime.sendMessage({method:"getComments"},function(response){
  for (x = 0; x < response.length; x++) {
    console.log(response);
    if (response[x].url == currentTab) {
      $("#nocomments").hide();
      for (h=0;h<response[x].html.length;h++){
      $('#html').text(response[x].html[h]);
      }
      for (c=0;c<response[x].css.length;c++){
      $('#css').text(response[x].css[c]);
      }
      for (j=0;j<response[x].js.length;j++){
      $('#js').text(response[x].js[j]);
      }
    }
  };
});
