/* Tower of Hanoi Game */

export class TowerOfHanoiGame {
    constructor(diskCount = 3) {
        this.diskCount = diskCount;
        this.pegs = [[], [], []];
        this.moves = 0;
        this.pegNames = ['A', 'B', 'C'];
        this.moveHistory = [];
        this.initialize();
    }

    initialize() {
        // Fill peg A with disks (largest at bottom)
        for (let i = this.diskCount; i >= 1; i--) {
            this.pegs[0].push(i);
        }
    }

    moveDisk(fromPeg, toPeg) {
        if (this.isValidMove(fromPeg, toPeg)) {
            const disk = this.pegs[fromPeg].pop();
            this.pegs[toPeg].push(disk);
            this.moves++;
            this.moveHistory.push({ fromPeg, toPeg, disk });
            return true;
        }
        return false;
    }

    isValidMove(fromPeg, toPeg) {
        if (this.pegs[fromPeg].length === 0) return false;
        if (this.pegs[toPeg].length === 0) return true;

        const topFrom = this.pegs[fromPeg][this.pegs[fromPeg].length - 1];
        const topTo = this.pegs[toPeg][this.pegs[toPeg].length - 1];

        return topFrom < topTo;
    }

    isSolved() {
        return this.pegs[2].length === this.diskCount;
    }

    getMinimumMoves() {
        return Math.pow(2, this.diskCount) - 1;
    }

    calculateScore() {
        const minimum = this.getMinimumMoves();
        const moveEfficiency = Math.max(0, 100 - (this.moves - minimum) * 2);
        return Math.round(moveEfficiency * 10);
    }

    undo() {
        if (this.moveHistory.length > 0) {
            const { fromPeg, toPeg } = this.moveHistory.pop();
            const disk = this.pegs[toPeg].pop();
            this.pegs[fromPeg].push(disk);
            this.moves--;
        }
    }

    getPegState() {
        return this.pegs.map(peg => [...peg]);
    }
}
