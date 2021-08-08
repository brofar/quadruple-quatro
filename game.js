/**
 * Game module. Most game logic happens here.
 * @module Game
 */

export default class Game {
    constructor(playerOne, playerTwo) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;

        // Create an empty 3 x 3 board
        this.board = [new Array(3), new Array(3), new Array(3)];
    }

    AssignCards(deck) {
        // Return 5 random cards from the deck to assign to the player
        // Eventually, allow player to choose their hand.
    }

    // Returns true or false, randomly.
    CoinFlip() {
        return (Math.floor(Math.random() * 2) == 0);
    }

    // Add a card to the board
    PlaceCard(x, y, player, card) {

        // Add the card to the board
        this.board[x][y] = {
            "card":  card,
            "owner": player,
            "flip":  player
        }

        // Check adjacent tiles for flips
        let adjacentCards = this.Surroundings(this.board, x, y);
        
        if (adjacentCards.up) {
            if (card.top > adjacentCards.up.card.bottom) {
                this.FlipCard(x + 1, y, player);
            }
        }
        if (adjacentCards.down) {
            if (card.bottom > adjacentCards.down.card.top) {
                this.FlipCard(x - 1, y, player);
            }
        }
        if (adjacentCards.left) {
            if (card.left > adjacentCards.left.card.right) {
                this.FlipCard(x, y - 1, player);
            }
        }
        if (adjacentCards.right) {
            if (card.right > adjacentCards.right.card.left) {
                this.FlipCard(x, y + 1, player);
            }
        }

        // Check for game end
    }

    // Flips a card on the board
    FlipCard(x, y, player) {
        this.board[x][y].flip = player;
        // Do animation.
    }

    // Get the value of a given coordinate or null if it's out of range.
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

    // Get values of the surrounding cells
    Surroundings(matrix, x, y) {
        return {
            up:    this.GetCell(matrix, x - 1, y),
            right: this.GetCell(matrix, x,     y + 1),
            down:  this.GetCell(matrix, x + 1, y),
            left:  this.GetCell(matrix, x,     y - 1)
        }
    }
}