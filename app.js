const fs = require('fs');
const Game = require('./game');


async function ReadCards () {
    let rawdata = fs.readFileSync('static/cards.json');
    let allCards = JSON.parse(rawdata);

    return Promise.resolve(allCards);
}


// TODO: Check if a game is in progress

// TODO: Get decks for each player / assign starting deck if no deck.

(async () => {
    // Tests
    let cards = await ReadCards ();
    let game = new Game('Brofar', cards, 'WimblyD', cards);
    console.log('---');
    // Biggs & Wedge pattern - Wimbly should go first for accurate test.
    await game.PlaceCard(2, 0, "WimblyD", cards.find(x => x.name == "Biggs & Wedge"));  // Expect no flip
    await sleep(50);
    await game.PlaceCard(0, 2, "Brofar",  cards.find(x => x.name == "Funguar"));        // Expect no flip
    await sleep(50);
    await game.PlaceCard(1, 2, "WimblyD", cards.find(x => x.name == "Quistis"));        // Expect 0,2 to flip
    await sleep(50);
    await game.PlaceCard(1, 1, "Brofar",  cards.find(x => x.name == "Fastitocalon F")); // Expect 1,2 to flip
    await sleep(50);
    await game.PlaceCard(2, 1, "WimblyD", cards.find(x => x.name == "Elnoyle"));        // Expect 1,1 to flip
    await sleep(50);
    await game.PlaceCard(2, 2, "Brofar",  cards.find(x => x.name == "Gayla"));          // Expect 2,1 to flip
    await sleep(50);
    await game.PlaceCard(0, 1, "WimblyD", cards.find(x => x.name == "Jelleye"));        // Expect no flip
    await sleep(50);
    await game.PlaceCard(1, 0, "Brofar",  cards.find(x => x.name == "Caterchipillar")); // Expect 1,1 to flip
    await sleep(50);
    await game.PlaceCard(0, 0, "WimblyD", cards.find(x => x.name == "Anacondaur"));     // Expect no flip
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }