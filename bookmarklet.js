/*
   This script is used to generate a bookmark which adds
   reload.js to the page when opened
 */
var scriptToAdd = window.document.createElement("script");
scriptToAdd.setAttribute(
  "src",
  "https://raw.github.com/andybry/reloadjs/master/reload.js"
);
window.document.getElementsByTagName("head")[0].appendChild(scriptToAdd);
