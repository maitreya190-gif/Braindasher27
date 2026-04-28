/* Eight Queens Game */

export class EightQueensGame {
    constructor(boardSize = 8) {
        this.boardSize = boardSize;
        this.board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(false));
        this.queens = [];
        this.moves = 0;
        this.startTime = null;
    }

    placeQueen(row, col) {
        if (this.isValid(row, col)) {
            this.board[row][col] = true;
            this.queens.push({ row, col });
            this.moves++;
            return true;
        }
        return false;
    }

    removeQueen(row, col) {
        if (this.board[row][col]) {
            this.board[row][col] = false;
            this.queens = this.queens.filter(q => !(q.row === row && q.col === col));
            this.moves++;
            return true;
        }
        return false;
    }

    isValid(row, col) {
        if (this.board[row][col]) return false;

        // Check row
        for (let i = 0; i < this.boardSize; i++) {
            if (this.board[row][i]) return false;
        }

        // Check column
        for (let i = 0; i < this.boardSize; i++) {
            if (this.board[i][col]) return false;
        }

        // Check diagonals
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (this.board[i][j]) {
                    if (Math.abs(i - row) === Math.abs(j - col)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    isSolved() {
        return this.queens.length === this.boardSize;
    }

    calculateScore() {
        const timeTaken = (Date.now() - this.startTime) / 1000;
        const moveEfficiency = Math.max(0, 100 - (this.moves * 2));
        const timeBonus = Math.max(0, 100 - (timeTaken / 6));
        return Math.round((moveEfficiency + timeBonus) * 5);
    }

    reset() {
        this.board = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(false));
        this.queens = [];
        this.moves = 0;
    }
}
