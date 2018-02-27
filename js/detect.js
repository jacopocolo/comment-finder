//TODO:
//Create a popup that shows the comments

var totalComments = 0;
var comments = {
  url:window.location.href,
  html:[],
  css:[],
  js:[]
}

//UTILS
function loadXMLDoc(myurl, type) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //cases for parsers callback
            if (type == "html") {
                parseHtml(xmlhttp.responseText, myurl);
            }
            if (type == "css") {
                parseCss(xmlhttp.responseText, myurl);
            }
            if (type == "js") {
                parseJs(xmlhttp.responseText, myurl);
            }
        }
    }
    xmlhttp.open("GET", myurl, true);
    xmlhttp.send();
    return xmlhttp.onreadystatechange();
}

function insertComment(comment) {
    //chrome.runtime.sendMessage({msg: comment});
}

var findHtml = function() {
    loadXMLDoc(window.location.href, "html");
}

var parseHtml = function(string, source) {
    //console.log("✅ " + source);
    var matchHtml = string.match(/<!--[\s\S]*?-->/g);
    if (matchHtml === null) {
        //console.log('No HTML comments');
    } else {
        for (x = 0; x < matchHtml.length; x++) {
            comments.html.push([matchHtml[x],source]);        }
        totalComments += x;
    }
    var matchCss = string.match(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//);
    if (matchCss === null) {
        //console.log('No CSS comments in HTML');
    } else {
        for (x = 0; x < matchCss.length; x++) {
            comments.html.push([matchCss[x],source]);
        }
        totalComments += x;
    }
    var matchJs = string.match(/\/\*[\s\S]*?\*\/|([^\\:'"]|^)\/\/.*$/gm);
    if (matchJs === null) {
        //console.log('No js comments in HTML');
    } else {
        for (x = 0; x < matchJs.length; x++) {
            comments.html.push([matchJs[x],source]);
        }
        totalComments += x;
    }
    //last function to be called, the one that updates the badge
    //console.log(comments);
    chrome.runtime.sendMessage(comments);
}

//CSS Comments
var findCss = function() {
    var css = document.getElementsByTagName('link');
    for (x = 0; x < css.length; x++) {
        if (css[x].rel == "stylesheet" &&
            css[x].href.includes(window.location.hostname) &&
            css[x].href.includes(".css") &&
            !css[x].href.includes("min.css")
        ) {
            loadXMLDoc(css[x].href, "css");
        } else {
            //console.log("css filtered: " + css[x].href)
        }
    }
}

var parseCss = function(string, source) {
    //console.log("✅ " + source);
    cssMatch = string.match(/(\/\*([\s\S]*?)\*\/)|(^\/\/(.*)$)/gm);
    if (cssMatch === null) {
        //console.log('No CSS comments');
    } else {
        for (x = 0; x < cssMatch.length; x++) {
            //source is the source file here
            comments.css.push([cssMatch[x],source]);
        }
        totalComments += x;
        //console.log(totalComments);
    }
}

//Javascript comments
var findJs = function() {
    var js = document.getElementsByTagName('script');
    for (x = 0; x < js.length; x++) {
        if (js[x].src.includes(".js") &&
            js[x].src.includes(window.location.hostname) &&
            !js[x].src.includes("min.js") &&
            !js[x].src.includes("cdn") &&
            !js[x].src.includes("google")
        ) {
            loadXMLDoc(js[x].src, "js");
        } else {
            //console.log("js filtered: " + js[x].src)
        }
    }
}

var parseJs = function(string, source) {
    //console.log("✅ " + source);
    jsMatch = string.match(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm);
    if (jsMatch === null) {
        console.log('No JS comments');
    } else {
        for (x = 0; x < jsMatch.length; x++) {
            comments.js.push([jsMatch[x],source]);
        }
        totalComments += x;
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      findCss();
      findJs();
      findHtml();
    }
);

findCss();
findJs();
findHtml();
