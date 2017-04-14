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
