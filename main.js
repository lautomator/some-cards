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
        status: someCardsAppTargets.status
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
        if (noOfCards < 1 || noOfCards > len) {
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
    renderCard: function (target, template, card) {
        "use strict";
        var html = null;
        html = template.replace("%name%", card.name);
        html = html.replace("%suit%", card.suit);
        target[0].innerHTML += html;
        // console.log(target[0]);
    },
    renderHand: function (target, template, hand) {
        // Renders the HTML template and card data.
        // Takes in the html target <obj>,
        // template <str>, and current hand <obj>.
        // Returns false;
        "use strict";
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
    init: function () {
        "use strict";
        // define the deck of cards
        this.deck = this.generateDeck(this.cards.deckSize);

        // define the current hand
        this.currentHand = this.generateHand(this.deck, 5);

        // hide the status message
        if (this.currentHand !== null) {
            this.htmlTargets.status.style.visibility = "hidden";
        }

        this.renderHand(this.htmlTargets.items, this.htmlTemplates.card, this.currentHand);

        // NOTE: the cards should really shuffle and
        // utilize stack logic to simulate real play.
        // In this case, each hand is generated from a random
        // selection of cards from the deck.
    }
};

someCardsApp.init();
