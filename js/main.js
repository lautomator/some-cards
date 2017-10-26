var someCardsApp = {
    cards: {
        deckSize: 52,
        names: ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"],
        suits: ["hearts", "diamonds", "clubs", "spades"]
    },
    deck: null,
    currentHand: null,
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
        card.id = card.name + card.suit;

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
    renderCard: function (target, template, card) {
        "use strict";
        // Renders card html <str>.
        // Takes in the html target <obj>,
        // template <str>, and card <obj>.
        // Returns false;
        var html = null;

        html = template.replace(/%name%/gi, card.name);
        html = html.replace(/%suit%/gi, card.suit);
        target.innerHTML += html;
        return false;
    },
    renderHand: function (target, template, hand) {
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
            this.renderCard(target, template, card);
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
        // Set min/max number of cards that can be
        // be entered on the form. Sets the max and
        // min attributes.
        this.htmlTargets.noOfCardsIn.setAttribute("min", "1");
        this.htmlTargets.noOfCardsIn.setAttribute("max", this.cards.deckSize);

        // retrieve any GET params
        if (window.location.search !== "") {
            // process the form data
            var handSize = this.getFormInput(window.location.search.substr(1));

            // define the deck of cards
            this.deck = this.generateDeck(this.cards.deckSize);

            // define the current hand
            this.currentHand = this.generateHand(this.deck, handSize.numberOfCards);

            // hide the status message
            if (this.currentHand !== null) {
                this.htmlTargets.status.style.visibility = "hidden";
            }

            this.renderHand(this.htmlTargets.items, this.htmlTemplates.card, this.currentHand);
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
