Deal Some Cards
===============
```v0.1 alpha```

I heard you wanted some cards. Well, here ya go!

This simple web app prompts users to enter the number of cards they want dealt from a standard deck of 52 cards. The backend uses native javascript.

Not interesting enough? You can always put things into perspective by reading [this article](https://www.landofthebrave.info/colonial-life.htm).

Setup
-----
* Clone or fork this repository.

* Use Python's HTTP server on the command line: cd into this directory and use the command `python -m SimpleHTTPServer 9000`. Or, you can open `index.html` from your browser.

Development
-----------
If you edit `css/style.css` and/or `js/main.js`, use `grunt` to minify these files after editing. [Read the directions on setting up Grunt](https://gruntjs.com/). The Gruntfile with tasks is included in this VCS. You will also need these NPM Modules used with Grunt and they can be found on the [NPM website](https://www.npmjs.com/):

* grunt-contrib-cssmin

* grunt-contrib-uglify

Change the var someCardsAppTargets.dev in `index.html` to true when working in development to ensure active cache busters on the script and css. Change if to false for production.


Changelog
---------

2017-10-28
v0.1 alpha (in development)
