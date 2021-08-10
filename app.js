const fs = require('fs');
const Game = require('./game');

let rawdata = fs.readFileSync('static/cards.json');
let allCards = JSON.parse(rawdata);


// TODO: Check if a game is in progress

// TODO: Get decks for each player / assign starting deck if no deck.

test();

async function test() {
    // Tests
    let game = new Game('Brofar', allCards, 'WimblyD', allCards);
    console.log('---');
    // Biggs & Wedge pattern - Wimbly should go first for accurate test.
    game.PlaceCard(2, 0, "WimblyD", allCards.find(x => x.name == "Biggs & Wedge"));  // Expect no flip
    game.PlaceCard(0, 2, "Brofar",  allCards.find(x => x.name == "Funguar"));        // Expect no flip
    game.PlaceCard(1, 2, "WimblyD", allCards.find(x => x.name == "Quistis"));        // Expect 0,2 to flip
    game.PlaceCard(1, 1, "Brofar",  allCards.find(x => x.name == "Fastitocalon F")); // Expect 1,2 to flip
    game.PlaceCard(2, 1, "WimblyD", allCards.find(x => x.name == "Elnoyle"));        // Expect 1,1 to flip
    game.PlaceCard(2, 2, "Brofar",  allCards.find(x => x.name == "Gayla"));          // Expect 2,1 to flip
    game.PlaceCard(0, 1, "WimblyD", allCards.find(x => x.name == "Jelleye"));        // Expect no flip
    game.PlaceCard(1, 0, "Brofar",  allCards.find(x => x.name == "Caterchipillar")); // Expect 1,1 to flip
    game.PlaceCard(0, 0, "WimblyD", allCards.find(x => x.name == "Anacondaur"));     // Expect no flip
}