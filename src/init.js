// params
someCardsAppParams = {
    ver: 1.1,
    verDev: Math.random(),
    verProd: "2017-10-31-",
    cache: null,
    inDev: true,
};

// targets
var someCardsAppTargets = {
    items: document.getElementById("items"),
    status: document.getElementById("status"),
    noOfCardsIn: document.getElementById("noOfCardsIn"),
    reset: document.getElementById("reset"),
    headEl: document.getElementsByTagName("head"),
    link: document.createElement("link"),
    bodyEl: document.getElementsByTagName("body"),
    script: document.createElement("script"),
    footerEl: document.getElementById("version")
};

// templates
var someCardsAppTemplates = {
    card: '<div id="%id%" class="card"><div class="name-%name%">%name%</div><div class="suit-%suit%">%suit%</div></div>'
};

// load styles and scripts
someCardsAppTargets.link.rel = "stylesheet";
someCardsAppTargets.link.type = "text/css";

// define the assets version
if (someCardsAppParams.inDev) {
    someCardsAppParams.cache = someCardsAppParams.verDev;
} else {
    someCardsAppParams.cache = someCardsAppParams.verProd + someCardsAppParams.ver;
}

window.onload = function() {
    someCardsAppTargets.link.href = "css/style.min.css?v=" + someCardsAppParams.cache;
    someCardsAppTargets.script.src = "js/main.min.js?v=" + someCardsAppParams.cache;
    someCardsAppTargets.headEl[0].appendChild(someCardsAppTargets.link);
    someCardsAppTargets.bodyEl[0].appendChild(someCardsAppTargets.script);
};
