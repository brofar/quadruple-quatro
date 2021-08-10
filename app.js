const fs = require('fs');
const Game = require('./game');

let rawdata = fs.readFileSync('static/cards.json');
let allCards = JSON.parse(rawdata);


// TODO: Check if a game is in progress

// TODO: Get decks for each player / assign starting deck if no deck.


// Tests
let game = new Game('Brofar', allCards, 'WimblyD', allCards);
game.PlaceCard(1, 1, "Brofar", allCards[62]);
game.PlaceCard(1, 1, "WimblyD", allCards[4]);
game.PlaceCard(1, 2, "Brofar", allCards[4]);
game.PlaceCard(1, 2, "WimblyD", allCards[4]);