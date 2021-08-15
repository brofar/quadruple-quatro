/**
 * Game module. Most game logic happens here.
 * @module Game
 */

class Game {
    constructor(playerOneName, deckOne, playerTwoName, deckTwo) {
        this.players = {};

        // Create an empty 3 x 3 board
        this.board = [new Array(3), new Array(3), new Array(3)];

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

    // Add a card to the board
    async PlaceCard(x, y, playerName, card) {

        console.log('turn check');

        // Check whose turn it is.
        if (this.currentTurn != playerName) {
            console.warn(`Not your turn, ${playerName}. (Add error handling here.)`)
            return;
        }

        console.log('overlap check');
        // Disallow placing a card on another card.
        if (this.board[x][y]) {
            console.warn(`${x},${y} already taken, ${playerName}. (Add error handling here.)`)
            return;
        }

        console.log('add to board');
        // Add the card to the board
        this.board[x][y] = {
            "card": card,
            "owner": playerName,
            "flip": playerName
        }

        console.log(`${playerName} played ${card.name} (T${card.top} / L${card.left} / B${card.bottom} / R${card.right}) on ${x},${y}`);
        
        console.log('do flips');
        // Check adjacent tiles for flips
        // Make this its own method.
        let adjacentCards = this.Surroundings(this.board, x, y);

        if (adjacentCards.up) {
            if (card.top > adjacentCards.up.card.bottom && adjacentCards.up.card.flip != playerName) {
                this.FlipCard(x - 1, y, playerName);
            }
        }
        if (adjacentCards.down) {
            if (card.bottom > adjacentCards.down.card.top && adjacentCards.down.card.flip != playerName) {
                this.FlipCard(x + 1, y, playerName);
            }
        }
        if (adjacentCards.left) {
            if (card.left > adjacentCards.left.card.right && adjacentCards.left.card.flip != playerName) {
                this.FlipCard(x, y - 1, playerName);
            }
        }
        if (adjacentCards.right) {
            if (card.right > adjacentCards.right.card.left && adjacentCards.right.card.flip != playerName) {
                this.FlipCard(x, y + 1, playerName);
            }
        }

        // Check for game end

        console.log('calculate next turn')
        // Next turn
        this.NextTurn();

        return Promise.resolve(true);
    }

    // Flips a card on the board
    FlipCard(x, y, player) {
        console.log(`Flipping card at ${x},${y}`);
        this.board[x][y].flip = player;
        // Do animation.
    }

    NextTurn() {
        const playerIndex = this.players.findIndex(x => x.name != this.currentTurn);
        this.currentTurn = this.players[playerIndex].name;
    }

    // Get the value of a given coordinate in a matrix or null if it's out of range.
    GetCell(matrix, x, y) {
        var NO_VALUE = null;
        var value, hasValue;

        try {
            hasValue = matrix[x][y] !== undefined;
            value = hasValue ? matrix[x][y] : NO_VALUE;
        } catch (e) {
            value = NO_VALUE;
        }
        return value;
    }

    // Get values of cells surrounding a given cell
    Surroundings(matrix, x, y) {
        return {
            up: this.GetCell(matrix, x - 1, y),
            right: this.GetCell(matrix, x, y + 1),
            down: this.GetCell(matrix, x + 1, y),
            left: this.GetCell(matrix, x, y - 1)
        }
    }
}

module.exports = Game;