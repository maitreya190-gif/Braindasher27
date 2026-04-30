/* Tower of Hanoi Game */

export class TowerOfHanoiGame {
    constructor(diskCount = 3, seed = null) {
        this.diskCount = diskCount;
        this.pegs = [[], [], []];
        this.moves = 0;
        this.pegNames = ['A', 'B', 'C'];
        this.moveHistory = [];
        this.seed = seed || Math.random();
        this.initialize();
    }

    initialize() {
        // Generate random starting configuration
        const disks = Array.from({ length: this.diskCount }, (_, i) => this.diskCount - i);
        this.randomizeDistribution(disks);
    }

    randomizeDistribution(disks) {
        // Seed-based random for consistency
        let rngIndex = 0;
        const seededRandom = () => {
            const x = Math.sin(this.seed + rngIndex++) * 10000;
            return x - Math.floor(x);
        };

        // Shuffle disks randomly
        for (let i = disks.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [disks[i], disks[j]] = [disks[j], disks[i]];
        }

        // Distribute randomly across pegs while maintaining Tower of Hanoi constraints
        const pegCounts = [0, 0, 0];
        for (let i = 0; i < this.diskCount; i++) {
            let pegIdx = Math.floor(seededRandom() * 3);
            pegCounts[pegIdx]++;
        }

        // Place disks on pegs in descending order (largest at bottom)
        let diskIdx = 0;
        for (let pegIdx = 0; pegIdx < 3; pegIdx++) {
            const disksOnPeg = [];
            for (let i = 0; i < pegCounts[pegIdx] && diskIdx < disks.length; i++) {
                disksOnPeg.push(disks[diskIdx++]);
            }
            disksOnPeg.sort((a, b) => b - a); // Largest first (bottom)
            this.pegs[pegIdx] = disksOnPeg;
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
