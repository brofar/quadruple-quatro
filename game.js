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

    AssignCards (deck) {
        // Return 5 random cards from the deck to assign to the player
    }

    CoinFlip() {
        return (Math.floor(Math.random() * 2) == 0);
    }

    PlaceCard(x, y, player, card) {
        this.board[x][y] = {
            "card": card,
            "owner": player,
            "flip": player
        }
    }
}