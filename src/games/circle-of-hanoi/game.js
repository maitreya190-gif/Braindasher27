/* Circle of Hanoi Game — pegs arranged in circle, movement restricted to adjacent pegs */

export class CircleOfHanoiGame {
    constructor(diskCount = 3, seed = null) {
        this.diskCount = diskCount;
        this.pegs = [[], [], []]; // A, B, C arranged in circle: A-B-C-A
        this.pegNames = ['A', 'B', 'C'];
        this.moves = 0;
        this.moveHistory = [];
        this.seed = seed || Math.random();
        this.initialize();
    }

    initialize() {
        // Random starting config (like randomized Hanoi)
        const disks = Array.from({ length: this.diskCount }, (_, i) => this.diskCount - i);
        this.randomizeDistribution(disks);
    }

    randomizeDistribution(disks) {
        let rngIndex = 0;
        const seededRandom = () => {
            const x = Math.sin(this.seed + rngIndex++) * 10000;
            return x - Math.floor(x);
        };

        for (let i = disks.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [disks[i], disks[j]] = [disks[j], disks[i]];
        }

        const pegCounts = [0, 0, 0];
        for (let i = 0; i < this.diskCount; i++) {
            pegCounts[Math.floor(seededRandom() * 3)]++;
        }

        let diskIdx = 0;
        for (let pegIdx = 0; pegIdx < 3; pegIdx++) {
            const disksOnPeg = [];
            for (let i = 0; i < pegCounts[pegIdx] && diskIdx < disks.length; i++) {
                disksOnPeg.push(disks[diskIdx++]);
            }
            disksOnPeg.sort((a, b) => b - a);
            this.pegs[pegIdx] = disksOnPeg;
        }
    }

    // Circle adjacency: A-B-C-A (0-1-2-0)
    isAdjacentInCircle(fromPeg, toPeg) {
        const diff = (toPeg - fromPeg + 3) % 3;
        return diff === 1 || diff === 2; // Can move to next or prev in circle
    }

    moveDisk(fromPeg, toPeg) {
        // Check circle adjacency constraint
        if (!this.isAdjacentInCircle(fromPeg, toPeg)) return false;

        if (this.pegs[fromPeg].length === 0) return false;
        if (this.pegs[toPeg].length > 0) {
            const topFrom = this.pegs[fromPeg][this.pegs[fromPeg].length - 1];
            const topTo = this.pegs[toPeg][this.pegs[toPeg].length - 1];
            if (topFrom >= topTo) return false; // Larger disc can't go on smaller
        }

        const disk = this.pegs[fromPeg].pop();
        this.pegs[toPeg].push(disk);
        this.moves++;
        this.moveHistory.push({ fromPeg, toPeg, disk });
        return true;
    }

    isSolved() {
        // Win condition: all discs on peg B (target in circle)
        return this.pegs[1].length === this.diskCount;
    }

    getMinimumMoves() {
        // Circle constraint makes it harder — rough estimate
        return Math.pow(3, this.diskCount) - 1;
    }

    calculateScore() {
        const minimum = this.getMinimumMoves();
        const moveEfficiency = Math.max(0, 100 - (this.moves - minimum) * 1.5);
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
