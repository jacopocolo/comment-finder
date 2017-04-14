javascript: (function() {
    (function() {
        function loadCSS(filename) {
            var file = document.createElement("link");
            file.setAttribute("rel", "stylesheet");
            file.setAttribute("type", "text/css");
            file.setAttribute("href", filename);
            if (typeof file !== "undefined");
            document.getElementsByTagName("head")[0].appendChild(file);
        };
        loadCSS("https://rawgit.com/jacopocolo/detector/master/cd.css?x=" + (Math.random()));
      var comDet = function() {
          var html = document.getElementsByTagName('html')[0].innerHTML;
            var matchHtml = html.match(/<!--/g);
            if (matchHtml === null) {
                console.log('There are no comments here');
            } else {
                for (var x = 0; x < matchHtml.length; x = x + 1) {
                    var inizioCommento = html.search('<!--');
                    var fineCommento = html.search('-->');
                    var commento = html.substring(inizioCommento + 4, fineCommento);
                    var html = html.substring(fineCommento + 3);
                    var newElement = '<div id="commentdetector"><pre>' + commento + '</pre></div>';
                    var bodyElement = document.body;
                    bodyElement.innerHTML = newElement + bodyElement.innerHTML;
                }
            }
        };
        comDet();
    })()
})()


var css = document.getElementsByTagName('link');
for (x=0;x<css.length;x++) {
  if (css[x].href.includes(".css") && !css[x].href.includes("min.css"))
  console.log(css[x].href)
}

function loadXMLDoc(theURL)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            alert(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", theURL, false);
    xmlhttp.send();
}
var js = document.getElementsByTagName('script');
for (x=0;x<js.length;x++) {
  if (js[x].src.includes(".js") && !js[x].src.includes("min.js"))
  console.log(httpGet(js[x].src))
}
