var someCardsApp = {
    cards: {
        deckSize: 52,
        names: ["ace", "02", "03", "04", "05", "06", "07", "08", "09", "10", "jack", "queen", "king"],
        suits: ["hearts", "diamonds", "clubs", "spades"],
        cardBackgroundPos: []
    },
    deck: null,
    currentHand: null,
    params: {
    	ver: someCardsAppParams.ver
    },
    htmlTargets: {
        items: someCardsAppTargets.items,
        status: someCardsAppTargets.status,
        reset: someCardsAppTargets.reset,
        noOfCardsIn: someCardsAppTargets.noOfCardsIn
    },
    htmlTemplates: {
        card: someCardsAppTemplates.card
    },
    status: "no data",
    sortBgImages: function (bgs) {
        "use strict";
        // Sorts the bgs <array> in
        // accordance with the bg image.
        // Returns the sorted bgs <array>
        // Sort order is thus:
        // Clubs:       ace -> king
        // Spades:      ace -> king
        // Hearts:      ace -> king
        // Diamonds:    ace -> king
        var index = 0;
        var len = bgs.length;
        var idSplit = [];
        var clubs = [];
        var spades = [];
        var hearts = [];
        var diamonds = [];
        var bgsSorted = [];

        // sort by the suit
        while (index < len) {
            idSplit = bgs[index][0].split("-");
            if (idSplit[1] === "clubs") {
                clubs.push(bgs[index]);
            } else if (idSplit[1] === "spades") {
                spades.push(bgs[index]);
            }  else if (idSplit[1] === "hearts") {
                hearts.push(bgs[index]);
            } else {
                diamonds.push(bgs[index]);
            }
            index += 1;
        }

        // sort buy the card number
        clubs.sort();
        spades.sort();
        hearts.sort();
        diamonds.sort();

        // correct the sort (move the Ace and King)
        clubs.unshift(clubs[9]);
        clubs.splice(10, 1);
        clubs.push(clubs[11]);
        clubs.splice(11, 1);
        spades.unshift(spades[9]);
        spades.splice(10, 1);
        spades.push(spades[11]);
        spades.splice(11, 1);
        hearts.unshift(hearts[9]);
        hearts.splice(10, 1);
        hearts.push(hearts[11]);
        hearts.splice(11, 1);
        diamonds.unshift(diamonds[9]);
        diamonds.splice(10, 1);
        diamonds.push(diamonds[11]);
        diamonds.splice(11, 1);

        // define the final array
        index = 0;
        while (index < clubs.length) {
            bgsSorted.push(clubs[index]);
            index += 1;
        }
        index = 0;
        while (index < spades.length) {
            bgsSorted.push(spades[index]);
            index += 1;
        }
        index = 0;
        while (index < hearts.length) {
            bgsSorted.push(hearts[index]);
            index += 1;
        }
        index = 0;
        while (index < diamonds.length) {
            bgsSorted.push(diamonds[index]);
            index += 1;
        }

        return bgsSorted;
    },
    generateBgPosIDs: function (deck) {
        "use strict";
        // Adds the card IDs to the
        // cardBackgroundPos dataset.
        // Takes in the cards background pos
        // dataset <array> and the deck <array>.
        // Returns and updated background pos
        // dataset <array>.
        var index = 0;
        var len = deck.length;
        var bgs = [];

        // Cycle through the deck and get
        // the ids. Add them to the bgs dataset.
        while (index < len) {
            bgs.push([deck[index].id, ""]);
            index += 1;
        }

        // sort
        bgs = this.sortBgImages(bgs);
        return bgs;
    },
    generateBgPos: function (cards) {
        "use strict";
        // Designates the coordinates for
        // the background position of the
        // cards graphic.
        // Takes in the card bg pos <array>.
        // Returns the card bg positions
        // with values <array>.
        var index = 0;
        var len = cards.cardBackgroundPos.length;
        var xPos = -5; // starting value
        var yPos = -5; // starting value
        var xIncr = 142;
        var yIncr = 190;
        var xThresh = -1709; // reset to next row
        var template = "%x%px %y%px";
        var bgPos = cards.cardBackgroundPos;

        // populate data
        while (index < len) {
            template = template.replace("%x%", xPos);
            template = template.replace("%y%", yPos);
            bgPos[index][1] = template;

            // reset
            template = "%x%px %y%px";

            // increment
            xPos -= xIncr;
            // next row
            if (xPos < xThresh) {
                xPos = -5;
                yPos -= yIncr;
            }
            index += 1;
        }
        return bgPos;

    },
    getRandomInt: function (min, max) {
        "use strict";
        // Returns a random number <int>.
        // Takes in min/max <int>.
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
    },
    checkDupCard: function (deck, cardId) {
        "use strict";
        // Checks for a duplicate card.
        // Returns true or false <bool>.
        // Takes in the cardId <str> and
        // the current state of the deck <array>.
        var len = deck.length;
        var index = 0;
        var duplicate = false;

        // iterate through the existing state
        // of the deck and check for a duplicate
        while (index < len) {
            if (deck[index].id === cardId) {
                duplicate = true;
                break;
            }
            index += 1;
        }
        return duplicate;
    },
    generateCard: function (cards) {
        "use strict";
        // Generates a card <object>.
        // Takes in the card specs <object>.
        var card = {
            name: null,
            suit: null,
            id: null
        };
        var names = cards.names;
        var nLen = names.length - 1;
        var suits = cards.suits;
        var sLen = suits.length - 1;
        var rN = this.getRandomInt(0, nLen); // random name
        var rS = this.getRandomInt(0, sLen); // random suit

        card.name = cards.names[rN];
        card.suit = cards.suits[rS];
        card.id = card.name + "-" + card.suit;

        return card;
    },
    generateDeck: function (deckSize) {
        "use strict";
        // Returns a deck of cards <array>.
        // Takes in the deck size.
        var index = 0;
        var deck = [];
        var card = {};

        // generate the deck
        while (index < deckSize) {
            // generate a card
            card = this.generateCard(this.cards);

            // check for duplicate cards
            while (this.checkDupCard(deck, card.id)) {
                card = this.generateCard(this.cards);
            }

            deck.push(card);
            index += 1;
        }

        return deck;

    },
    generateHand: function (deck, noOfCards) {
        "use strict";
        // Generates a hand of cards.
        // Takes in the deck <array> and
        // the number of cards (max = deck size) <int>.
        // Returns the hand <array>.
        var hand = [];
        var len = deck.length - 1; // account for 0 index
        var index = 0;
        var rC = 0; // random card index
        var card = {};

        // ensure the number of cards is valid
        if (noOfCards < 1 || noOfCards > len + 1) {
            noOfCards = 5; // fallback
        } else {
            // adjustment for 0 index
            noOfCards = noOfCards - 1;
        }

        // generate the hand
        while (index <= noOfCards) {
            rC = this.getRandomInt(0, len);
            card = deck[rC];

            // ensure there are no duplicate cards
            while (this.checkDupCard(hand, card.id)) {
                rC = this.getRandomInt(0, len);
                card = deck[rC];
            }
            hand.push(card);
            index += 1;
        }

        return hand;
    },
    getFormInput: function (q) {
        "use strict";
        // Parses any form input.
        // Takes in the query string <str>.
        // Returns the params <obj>.
        var result = q.split("&");
        var params = {
            numberOfCards: null
            // could be more params
        };
        var index = 0;
        var len = result.length;
        var getItems = null;

        while (index < len) {
            getItems = result[index].split("=");
            params.numberOfCards = getItems[1];
            index += 1;
        }
        return params;
    },
    renderFooter: function (v) {
    	"use strict";
    	// Takes in the version number <str>
    	var footerEl = someCardsAppTargets.footerEl;
    	footerEl.innerHTML = v;

    },
    renderCard: function (target, template, card, cardBgPos) {
        "use strict";
        // Renders card html <str>.
        // Takes in the html target <obj>,
        // template <str>, and card <obj>.
        // Returns false;
        var html = null;
        var index = 0;
        var len = cardBgPos.length;
        var bgStyle = null;
        var bgEl = null;

        html = template.replace(/%name%/gi, card.name);
        html = html.replace(/%suit%/gi, card.suit);
        html = html.replace("%id%", card.id);
        target.innerHTML += html;

        // set the background image
        while (index < len) {
            if (cardBgPos[index][0] === card.id) {
                bgStyle = cardBgPos[index][1];
                break;
            }
            index += 1;
        }
        bgEl = document.getElementById(card.id);
        bgEl.style.backgroundPosition = bgStyle;

        return false;
    },
    renderHand: function (target, template, hand, cards) {
        "use strict";
        // Renders the HTML template and card data.
        // Takes in the html target <obj>,
        // template <str>, and current hand <obj>.
        // Returns false;
        var len = hand.length;
        var index = 0;
        var card = null;

        while (index < len) {
            card = hand[index];
            this.renderCard(target, template, card, cards.cardBackgroundPos);
            index += 1;
        }

        return false;
    },
    reset: function (t) {
        "use strict";
        // clear
        t.items.innerHTML = "";
        t.status.style.visibility = "visible";
    },
    init: function () {
        "use strict";
        // define the deck of cards
        this.deck = this.generateDeck(this.cards.deckSize);

        // generate dataset for bg positions
        this.cards.cardBackgroundPos = this.generateBgPosIDs(this.deck);

        // set up the background positions of the cards
        this.cards.cardBackgroundPos = this.generateBgPos(this.cards, this.deck);

        // Set min/max number of cards that can be
        // be entered on the form. Sets the max and
        // min attributes.
        this.htmlTargets.noOfCardsIn.setAttribute("min", "1");
        this.htmlTargets.noOfCardsIn.setAttribute("max", this.cards.deckSize);

        // set the footer
        this.renderFooter(this.params.ver);

        // retrieve any GET params
        if (window.location.search !== "") {
            // process the form data
            var handSize = this.getFormInput(window.location.search.substr(1));

            // define the current hand
            this.currentHand = this.generateHand(this.deck, handSize.numberOfCards);

            // hide the status message
            if (this.currentHand !== null) {
                this.htmlTargets.status.style.visibility = "hidden";
            }

            this.renderHand(
                this.htmlTargets.items,
                this.htmlTemplates.card,
                this.currentHand,
                this.cards);
        }
        // NOTE: the cards should really shuffle and
        // utilize stack logic to simulate real play.
        // In this case, each hand is generated from a random
        // selection of cards from the deck.
    }
};

// init
someCardsApp.init();

// events
someCardsApp.htmlTargets.reset.addEventListener("click", function () {
    "use strict";
    someCardsApp.reset(someCardsApp.htmlTargets);
}, false);
