/* Mastermind Game */

export class MastermindGame {
    constructor(codeLength = 4, colors = 6, maxAttempts = 10) {
        this.codeLength = codeLength;
        this.colors = colors;
        this.maxAttempts = maxAttempts;
        this.secretCode = this.generateCode();
        this.attempts = [];
        this.gameOver = false;
        this.won = false;
    }

    generateCode() {
        const code = [];
        for (let i = 0; i < this.codeLength; i++) {
            code.push(Math.floor(Math.random() * this.colors));
        }
        return code;
    }

    makeGuess(guess) {
        if (this.gameOver) return null;
        if (guess.length !== this.codeLength) return null;

        const feedback = this.getFeedback(guess);
        this.attempts.push({ guess, feedback });

        if (this.isCorrectGuess(feedback)) {
            this.won = true;
            this.gameOver = true;
        } else if (this.attempts.length >= this.maxAttempts) {
            this.gameOver = true;
        }

        return feedback;
    }

    getFeedback(guess) {
        let correctPosition = 0;
        let correctColor = 0;

        const secretCopy = [...this.secretCode];
        const guessCopy = [...guess];

        for (let i = 0; i < this.codeLength; i++) {
            if (guessCopy[i] === secretCopy[i]) {
                correctPosition++;
                guessCopy[i] = -1;
                secretCopy[i] = -2;
            }
        }

        for (let i = 0; i < this.codeLength; i++) {
            if (guessCopy[i] !== -1) {
                for (let j = 0; j < this.codeLength; j++) {
                    if (guessCopy[i] === secretCopy[j]) {
                        correctColor++;
                        guessCopy[i] = -1;
                        secretCopy[j] = -2;
                        break;
                    }
                }
            }
        }

        return { correctPosition, correctColor };
    }

    isCorrectGuess(feedback) {
        return feedback.correctPosition === this.codeLength;
    }

    calculateScore() {
        if (!this.won) return 0;
        const attemptsUsed = this.attempts.length;
        return Math.round(((this.maxAttempts - attemptsUsed + 1) / this.maxAttempts) * 1500);
    }

    getGameState() {
        return {
            won: this.won,
            gameOver: this.gameOver,
            attemptsRemaining: this.maxAttempts - this.attempts.length,
            attempts: this.attempts,
            totalAttempts: this.attempts.length
        };
    }
}
