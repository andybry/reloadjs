(function() {

  if(window.jQuery === undefined) {
    var jqueryScript = window.document.createElement("script");
    jqueryScript.onload = pollResources;
    jqueryScript.setAttribute(
      "src",
      "http://code.jquery.com/jquery.js"
    );
    window.document.getElementsByTagName("head")[0].appendChild(jqueryScript);
  } else {
    pollResources();
  }

  function pollResources() {
    var cachedTimes = {},
    $stylesheets = $("link[rel=stylesheet]"),
    thisPage = window.location.href,
    $javascripts = $("script[src]");
  
    window.setInterval(function() {
      // the page itself
      $.ajax({
        url: thisPage,
        cache: false,
        type: 'HEAD', 
        success: function(data, status_message, response) {
          var lastModified = response.getResponseHeader("Last-Modified");
          if(cachedTimes[thisPage] === undefined) { 
            // first time only (not checked yet)
            cachedTimes[thisPage] = lastModified;
          } else if(cachedTimes[thisPage] == lastModified) {
            // do nothing - we got a cache hit
          } else {
            // cache miss, so update the page
            if(thisPage.match(/\?/)) {
              window.location.href = thisPage.replace(/(&_\d+)?$/, "&_" + (new Date).getTime());
            } else {
              window.location.href = thisPage + "?_" + (new Date).getTime();
            }
          }
        }
      });
  
      // stylesheets
      $stylesheets.each(function(index, linkElement) {
        var stylesheetUrl = linkElement.href;
        $.ajax({
          url: stylesheetUrl,
          cache: false,
          type: 'HEAD', 
          success: function(data, status_message, response) {
            var lastModified = response.getResponseHeader("Last-Modified");
            if(cachedTimes[stylesheetUrl] === undefined) { 
              // first time only (not checked yet)
              if(linkElement.href.match(/\?/)) {
                linkElement.href = stylesheetUrl.replace(/(&_\d+)?$/, "&_" + (new Date).getTime());
              } else {
                linkElement.href = stylesheetUrl + "?_" + (new Date).getTime();
              }
              stylesheetUrl = linkElement.href;
              cachedTimes[stylesheetUrl] = lastModified;
            } else if(cachedTimes[stylesheetUrl] == lastModified) {
              // do nothing - we got a cache hit
            } else {
              // cache miss, so update the stylesheet and cache time
              if(linkElement.href.match(/\?/)) {
                linkElement.href = stylesheetUrl.replace(/(&_\d+)?$/, "&_" + (new Date).getTime());
              } else {
                linkElement.href = stylesheetUrl + "?_" + (new Date).getTime();
              }
              cachedTimes[stylesheetUrl] = lastModified;
            }
          }
        });
      });
      
      // javascript
      $javascripts.each(function(index, scriptElement) {
        var scriptSrc = scriptElement.src;
        if(scriptSrc.match("onreload.js")) {
          $.ajax({
            url: scriptSrc,
            dataType: "text",
            cache: false,
            success: function(data, status_message, response) {
              var lastModified = response.getResponseHeader("Last-Modified");
              if(cachedTimes[scriptSrc] === undefined) { 
                // first time only (not checked yet)
                cachedTimes[scriptSrc] = lastModified;
              } else if(cachedTimes[scriptSrc] == lastModified) {
                // do nothing - we got a cache hit
              } else {
                // cache miss, so update the page
                if(scriptSrc.match(/\?/)) {
                  scriptElement.src = scriptSrc.replace(/(&_\d+)?$/, "&_" + (new Date).getTime());
                } else {
                  scriptElement.src = scriptSrc + "?_" + (new Date).getTime();
                }
                cachedTimes[scriptSrc] = lastModified;
                eval(data);
              }
            }
          });

        }
      });
 
    }, 100);
  }

})();
