# Reloadjs

Reload.js is a script for automatically reloading CSS and HTML from a Web server whenever a change is made to the remote files. In addition it will run the contents of one JavaScript file.

Reload.js's main purpose is for running relatively small amounts of JavaScript, HTML and CSS at the same time as writing it across multiple browsers at the same time.

It is intended as a development and learning tool.

It works well with CSS precompilers like [sass](http://sass-lang.com/).


## Usage

Add the reload.js script to your Web server and webpage, and it will automatically start polling for for changes to CSS files and HTML the next time the page is loaded.

### HTML reloading

Whenever a change is made to the HTML all browsers reading the page will be reloaded

### CSS reloading

Any CSS files that are loaded on the page will be dynamically reloaded whenever changes are made.

### JavaScript reloading

JavaScript files are not all reloaded on change because that could have unintended consequences as the JavaScript is run twice. Instead, if there is a file called 'onreload.js' on the current page (or anything ending 'onreload.js') then its contents will be evaluated on all browsers with the page open whenever the files contents change.

This is particularly handy for ad hoc remote debugging on mobile and tablet devices.

### Multi browser testing

The updates will affect any browsers that have requested the page. This makes it useful for writing and running code against many browsers at once.

### The demo

The whole repository serves as a demo. If you clone it into a webserver and request the index.htm then any changes to the HTML, CSS and JavaScript are automatically pulled to the open browsers as above.
