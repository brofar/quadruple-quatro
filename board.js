/**
 * Game Board module.
 * @module Board
 */

/**
 * _____________
 * | 1 | 2 | 3 |
 * | 4 | 5 | 6 |
 * | 7 | 8 | 9 |
 * ‾‾‾‾‾‾‾‾‾‾‾‾‾
 * Each cell will be a card object.
 */

class Board {
    constructor() {
        // Create an empty 3 x 3 board
        this.board = [new Array(3), new Array(3), new Array(3)];
        console.log(`New game board created.`);
    }

    get cell(cellNum) {
        switch (cellNum) {
            case 1:
                return this.board[0][0];
            case 2:
                return this.board[0][1];
            case 3:
                return this.board[0][2];
            case 4:
                return this.board[1][0];
            case 5:
                return this.board[1][1];
            case 6:
                return this.board[1][2];
            case 7:
                return this.board[2][0];
            case 8:
                return this.board[2][1];
            case 9:
                return this.board[2][2];
        }
    }

    set cell(cellNum, card) {
        switch (cellNum) {
            case 1:
                this.board[0][0] = card;
                break;
            case 2:
                this.board[0][1] = card;
                break;
            case 3:
                this.board[0][2] = card;
                break;
            case 4:
                this.board[1][0] = card;
                break;
            case 5:
                this.board[1][1] = card;
                break;
            case 6:
                this.board[1][2] = card;
                break;
            case 7:
                this.board[2][0] = card;
                break;
            case 8:
                this.board[2][1] = card;
                break;
            case 9:
                this.board[2][2] = card;
                break;
        }
    }

    // Add a card to the board
    async PlaceCard(cellNum, card) {

        /*
        DO IN GAME LOGIC
                    console.log('turn check');
        
                // Check whose turn it is.
                if (this.currentTurn != playerName) {
                    console.warn(`Not your turn, ${playerName}. (Add error handling here.)`)
                    return;
                }
        */
        console.log('overlap check');
        // Disallow placing a card on another card.
        if (this.cell(cellNum)) {
            let err = `Slot ${cellNum} is already taken. (Add error handling here.)`;
            console.warn(err)
            return err;
        }

        console.log('add to board');
        this.cell(cellNum) = card;

        console.log(`${playerName} played ${card.name} (T${card.top} / L${card.left} / B${card.bottom} / R${card.right}) on ${x},${y}`);

        /* 
        DO IN GAME LOGIC

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
        */

        // Update score - DO IN GAME LOGIC
        // Check for game end - DO IN GAME LOGIC

        /* 
        DO IN GAME LOGIC
        console.log('calculate next turn')
        // Next turn
        this.NextTurn();
*/
        return Promise.resolve(true);
    }

    // Flips a card on the board
    FlipCard(cellNum) {
        let card = this.cell(cellNum);
        card.flipped = !card.flipped;
        this.cell(cellNum) = card;
        console.log(`Flipped card in slot ${cellNum} to ${card.flipped}`);
        // Do animation.
    }

    // Get values of cells surrounding a given cell
    Surroundings(cellNum) {
        return {
            up: (cellNum > 3) ? cellNum - 3 : null,
            right: (cellNum % 3 != 0) ? cellNum + 1 : null,
            down: (cellNum < 7) ? cellNum + 3 : null,
            left: (cellNum % 3 != 1) ? cellNum - 1 : null
        }
    }
}

module.exports = Board;