/* Wordle Game */

export class WordleGame {
    constructor(wordList = []) {
        this.wordList = wordList.length > 0 ? wordList : this.getDefaultWordList();
        this.secretWord = this.selectRandomWord();
        this.guesses = [];
        this.maxAttempts = 6;
        this.gameOver = false;
        this.won = false;
    }

    getDefaultWordList() {
        return [
            'BRAIN', 'LOGIC', 'CHESS', 'QUEST', 'SMART',
            'THINK', 'PUZZLE', 'RIDDLE', 'CODES', 'GAMES',
            'SOLVE', 'MATCH', 'TOUCH', 'WORLD', 'PLACE',
            'WORDS', 'ABOUT', 'AFTER', 'APPLE', 'BUILD',
            'BEGAN', 'CATCH', 'DANCE', 'EARTH', 'FIGHT',
            'GREAT', 'HAPPY', 'IDEAL', 'JUDGE', 'KNIFE'
        ];
    }

    selectRandomWord() {
        return this.wordList[Math.floor(Math.random() * this.wordList.length)];
    }

    makeGuess(word) {
        if (this.gameOver) return null;
        if (word.length !== 5) return null;

        word = word.toUpperCase();
        const feedback = this.getFeedback(word);
        this.guesses.push({ word, feedback });

        if (word === this.secretWord) {
            this.won = true;
            this.gameOver = true;
        } else if (this.guesses.length >= this.maxAttempts) {
            this.gameOver = true;
        }

        return feedback;
    }

    getFeedback(guess) {
        const feedback = Array(5).fill('absent');
        const secretLetters = this.secretWord.split('');
        const guessLetters = guess.split('');

        // First pass: mark correct positions
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === secretLetters[i]) {
                feedback[i] = 'correct';
                secretLetters[i] = null;
                guessLetters[i] = null;
            }
        }

        // Second pass: mark present letters in wrong positions
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] !== null) {
                const index = secretLetters.indexOf(guessLetters[i]);
                if (index !== -1) {
                    feedback[i] = 'present';
                    secretLetters[index] = null;
                }
            }
        }

        return feedback;
    }

    isValidWord(word) {
        return this.wordList.includes(word.toUpperCase());
    }

    calculateScore() {
        if (!this.won) return 0;
        const attemptsUsed = this.guesses.length;
        return Math.round(((this.maxAttempts - attemptsUsed + 1) / this.maxAttempts) * 1200);
    }

    getGameState() {
        return {
            won: this.won,
            gameOver: this.gameOver,
            attemptsRemaining: this.maxAttempts - this.guesses.length,
            guesses: this.guesses,
            totalAttempts: this.guesses.length,
            secretWord: this.gameOver ? this.secretWord : null
        };
    }
}
