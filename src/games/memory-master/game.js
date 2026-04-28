/* Memory Master Game */

export class MemoryMasterGame {
    constructor(difficulty = 'easy') {
        this.difficulty = difficulty;
        this.gridSize = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
        this.cards = [];
        this.flipped = [];
        this.matched = [];
        this.moves = 0;
        this.score = 0;
        this.initialize();
    }

    initialize() {
        const totalCards = this.gridSize * this.gridSize;
        const pairs = totalCards / 2;
        this.cards = [];

        for (let i = 0; i < pairs; i++) {
            this.cards.push(i, i);
        }

        this.cards = this.cards.sort(() => Math.random() - 0.5);
        this.flipped = Array(totalCards).fill(false);
        this.matched = Array(totalCards).fill(false);
    }

    flipCard(index) {
        if (this.matched[index] || this.flipped[index]) return false;

        this.flipped[index] = true;
        this.moves++;

        if (this.flipped.filter(f => f).length === 2) {
            this.checkMatch();
        }

        return true;
    }

    checkMatch() {
        const flipped = this.flipped.map((f, i) => f ? i : -1).filter(i => i !== -1);

        if (flipped.length === 2) {
            const [i1, i2] = flipped;

            if (this.cards[i1] === this.cards[i2]) {
                this.matched[i1] = true;
                this.matched[i2] = true;
                this.score += 10;
            }

            setTimeout(() => {
                this.flipped[i1] = false;
                this.flipped[i2] = false;
            }, 1000);
        }
    }

    isSolved() {
        return this.matched.every(m => m);
    }

    getCard(index) {
        return {
            value: this.cards[index],
            flipped: this.flipped[index],
            matched: this.matched[index]
        };
    }

    calculateScore() {
        const perfectMoves = (this.gridSize * this.gridSize) / 2;
        const moveEfficiency = Math.max(0, 100 - (this.moves - perfectMoves) * 5);
        return Math.round(moveEfficiency * 10);
    }
}
