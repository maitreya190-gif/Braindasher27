/* Memory Master Game */

export class MemoryMasterGame {
    constructor(rows = 4, cols = 4) {
        this.rows = rows;
        this.cols = cols;
        this.cards = [];
        this.flipped = [];
        this.matched = [];
        this.moves = 0;
        this.score = 0;
        this.initialize();
    }

    initialize() {
        const totalCards = this.rows * this.cols;
        const pairs = Math.floor(totalCards / 2);
        this.cards = [];

        for (let i = 0; i < pairs; i++) {
            this.cards.push(i, i);
        }

        this.cards = this.cards.sort(() => Math.random() - 0.5);
        this.flipped = Array(this.cards.length).fill(false);
        this.matched = Array(this.cards.length).fill(false);
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
        const pairs = Math.floor((this.rows * this.cols) / 2);
        const moveEfficiency = Math.max(0, 100 - (this.moves - pairs) * 5);
        return Math.round(moveEfficiency * 10);
    }
}
