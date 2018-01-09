//TODO:
//- add loading animation or state
//- remove the no comment state

chrome.runtime.sendMessage({
  method: "getComments"
}, function(response) {
  console.log(response)
  $("#nocomments").hide();
  $("#htmllink").text("HTML(" + response.html.length + ")");
  $("#csslink").text("CSS(" + response.css.length + ")");
  $("#jslink").text("JS(" + response.js.length + ")");
  $("#url").append(response.url);

  //populates the sections with content from array or prints no comments if there's no content
  if (response.html.length > 0) {
    for (h = 0; h < response.html.length; h++) {
      $('<div class="comment"><div/>').text(response.html[h]).appendTo("#html");
    }
  } else {
    $('<div><div/>').text("No comments").appendTo("#html")
  }
  if (response.css.length > 0) {
    for (c = 0; c < response.css.length; c++) {
      $('<div class="comment"><div/>').text(response.css[c]).appendTo("#css");
    }
  } else {
    $('<div><div/>').text("No comments").appendTo("#css")
  };
  if (response.js.length > 0) {
    for (j = 0; j < response.js.length; j++) {
      $('<div class="comment"><div/>').text(response.js[j]).appendTo('#js');
    }
  } else {
    $('<div><div/>').text("No comments").appendTo("#js")
  }
  return
});

/*$('#render').click(function(e) {
  html2canvas($(".comment"), {
    onrendered: function(canvas) {
      document.body.appendChild(canvas);
      console.log(canvas.toDataURL())
    },
    height: 500,
    background: '#efe'
  });
});*/

/*var spinners = [
  "▁▃▄▅▆▇█▇▆▅▄▃",
  "▉▊▋▌▍▎▏▎▍▌▋▊▉",
  "▖▘▝▗",
  "▌▀▐▄",
  "┤┘┴└├┌┬┐",
  "◢◣◤◥",
  "◰◳◲◱",
  "◴◷◶◵",
  "◐◓◑◒",
  "|/-\\",
  ".oO@*",
  ["◡◡", "⊙⊙", "◠◠"],
  ["◜ ", " ◝", " ◞", "◟ "],
  "◇◈◆",
  "⣾⣽⣻⢿⡿⣟⣯⣷",
  "⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿",
  "⠁⠂⠄⡀⢀⠠⠐⠈",
  [">))'>", " >))'>", "  >))'>", "   >))'>", "    >))'>", "   <'((<", "  <'((<", " <'((<"],
];

for (var s = 0; s < spinners.length; ++s) {
  var spinner = spinners[s];
  var div = document.createElement('div');
  var el = document.createElement('pre');
  div.appendChild(el);
  document.body.appendChild(div);

  (function(spinner, el) {
    var i = 0;
    setInterval(function() {
      el.innerHTML = spinner[i];
      i = (i + 1) % spinner.length;
    }, 300);
  })(spinner, el);
}*/
