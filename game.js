/**
 * Game module. Most game logic happens here.
 * @module Game
 */

const Board = require('./board');

class Game {
    constructor(playerOneName, deckOne, playerTwoName, deckTwo) {
        this.players = {};

        // Create an empty 3 x 3 board
        this.board = new Board();

        // Assign hands        
        this.players[playerOneName] = {
            hand: this.AssignCards(deckOne)
        };
        this.players[playerTwoName] = {
            hand: this.AssignCards(deckTwo)
        };

        for (const key in Object.keys(this.players)) {
            console.log(`${this.players[key]} hand: ${this.players[key].hand.map(card => { return card.name })}`);
        }

        if (this.CoinFlip()) {
            this.currentTurn = playerOneName;
        } else {
            this.currentTurn = playerTwoName;
        }

        console.log(`New game started between ${playerOneName} vs. ${playerTwoName}. ${this.currentTurn} plays first.`);
    }

    AssignCards(deck) {
        // Return 5 random cards from the deck to assign to the player
        // Eventually, allow player to choose their hand.
        // Expects deck to be array of objects
        let playerHand = [];
        for (let i = 0; i < 5; i++) {
            let cardIndex = Math.floor(Math.random() * deck.length);
            let card = deck.splice(cardIndex, 1)[0];
            playerHand.push(card);
        }
        return playerHand;
    }

    // Returns true or false, randomly.
    CoinFlip() {
        return (Math.floor(Math.random() * 2) == 0);
    }

    get turn() {
        return this.currentTurn;
    }

    NextTurn() {
        const playerIndex = this.players.findIndex(x => x.name != this.currentTurn);
        this.currentTurn = this.players[playerIndex].name;
    }
}

module.exports = Game;