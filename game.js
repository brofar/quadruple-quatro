/**
 * Game module. Most game logic happens here.
 * @module Game
 */

class Game {
    constructor(playerOneName, deckOne, playerTwoName, deckTwo) {
        this.players = [];
        this.players.push({ name: playerOneName });
        this.players.push({ name: playerTwoName });

        // Create an empty 3 x 3 board
        this.board = [new Array(3), new Array(3), new Array(3)];

        // Assign hands
        this.AssignCards(playerOneName, deckOne);
        this.AssignCards(playerTwoName, deckTwo);

        if (this.CoinFlip()) {
            this.currentTurn = playerOneName;
        } else {
            this.currentTurn = playerTwoName;
        }

        console.log(`New game started between ${playerOneName} vs. ${playerTwoName}. ${this.currentTurn} plays first.`);
    }

    AssignCards(player, deck) {
        // Return 5 random cards from the deck to assign to the player
        // Eventually, allow player to choose their hand.
        // Expects deck to be array of objects
        const playerIndex = this.players.findIndex(x => x.name == player);
        let playerHand = [];
        for (let i = 0; i < 5; i++) {
            let cardIndex = Math.floor(Math.random() * deck.length);
            let card = deck.splice(cardIndex, 1)[0];
            playerHand.push(card);
        }

        this.players[playerIndex].hand = playerHand;
        console.log(`${player} hand: ${this.players[playerIndex].hand.map(card => { return card.name })}`);
    }

    // Returns true or false, randomly.
    CoinFlip() {
        return (Math.floor(Math.random() * 2) == 0);
    }

    get turn() {
        return this.currentTurn;
    }

    // Add a card to the board
    PlaceCard(x, y, playerName, card) {

        // Check whose turn it is.
        if (this.currentTurn != playerName) {
            console.warn(`Not your turn, ${playerName}. (Add error handling here.)`)
            return;
        }

        // Disallow placing a card on another card.
        if (this.board[x][y]) {
            console.warn(`${x},${y} already taken, ${playerName}. (Add error handling here.)`)
            return;
        }

        // Add the card to the board
        this.board[x][y] = {
            "card": card,
            "owner": playerName,
            "flip": playerName
        }

        let player = this.players.find(x => x.name == playerName);
        console.log(`${player.name} played ${card.name} (T${card.top} / L${card.left} / B${card.bottom} / R${card.right}) on ${x},${y}`);

        // Check adjacent tiles for flips
        // Make this its own method.
        let adjacentCards = this.Surroundings(this.board, x, y);

        if (adjacentCards.up) {
            if (card.top > adjacentCards.up.card.bottom) {
                this.FlipCard(x + 1, y, playerName);
            }
        }
        if (adjacentCards.down) {
            if (card.bottom > adjacentCards.down.card.top) {
                this.FlipCard(x - 1, y, playerName);
            }
        }
        if (adjacentCards.left) {
            if (card.left > adjacentCards.left.card.right) {
                this.FlipCard(x, y - 1, playerName);
            }
        }
        if (adjacentCards.right) {
            if (card.right > adjacentCards.right.card.left) {
                this.FlipCard(x, y + 1, playerName);
            }
        }

        // Check for game end

        // Next turn
        this.NextTurn();
    }

    // Flips a card on the board
    FlipCard(x, y, player) {
        this.board[x][y].flip = player;
        console.log(`Flipping card at ${x},${y}`);
        // Do animation.
    }

    NextTurn() {
        const playerIndex = this.players.findIndex(x => x.name != this.currentTurn);
        this.currentTurn = this.players[playerIndex].name;
        console.log (`It is now ${this.currentTurn}'s turn.`);
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