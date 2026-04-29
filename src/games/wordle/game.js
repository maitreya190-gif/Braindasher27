/* Wordle Game */

export class WordleGame {
    constructor(maxAttempts = 6, wordDifficulty = 'medium') {
        this.maxAttempts = maxAttempts;
        this.wordDifficulty = wordDifficulty;
        this.wordList = this.getWordList(wordDifficulty);
        this.secretWord = this.selectRandomWord();
        this.guesses = [];
        this.gameOver = false;
        this.won = false;
    }

    getWordList(difficulty) {
        const lists = {
            // Common words, easy to narrow down in 8 attempts
            easy: [
                'BRAIN', 'GAMES', 'CHESS', 'SMART', 'THINK',
                'LIGHT', 'WORLD', 'EARTH', 'HAPPY', 'DANCE',
                'MATCH', 'PLACE', 'TOUCH', 'APPLE', 'GREAT',
                'JUDGE', 'KNIFE', 'MONEY', 'NIGHT', 'ROUND',
                'SMILE', 'SWEET', 'CLEAN', 'SCORE', 'REACH',
                'BRAVE', 'CLEAR', 'DRIVE', 'GRACE', 'POWER'
            ],
            // Well-known words but trickier letter patterns (6 attempts)
            medium: [
                'QUIRK', 'STRAY', 'ORBIT', 'GRASP', 'BLOOM',
                'BLAZE', 'CLASH', 'GROAN', 'STOMP', 'PERCH',
                'NOVEL', 'IVORY', 'HARSH', 'FROWN', 'EPOCH',
                'CRAMP', 'BRISK', 'STUNG', 'THICK', 'SWIPE',
                'QUILL', 'PLUMB', 'MIRTH', 'KNEEL', 'JOUST',
                'RISKY', 'VOCAL', 'SHRUB', 'CRAVE', 'TRAMP'
            ],
            // Common English words but very difficult to guess (5 attempts, unusual patterns)
            hard: [
                'CRIMP', 'BRAWN', 'FLINT', 'SCORN', 'SWAMP',
                'WRATH', 'PRANK', 'BLUNT', 'TRUCE', 'KNELT',
                'CLASP', 'GRUFF', 'VYING', 'YEARN', 'STOIC',
                'SKULK', 'WRUNG', 'THYME', 'DWELT', 'SYNTH',
                'PYGMY', 'NYMPH', 'TRYST', 'LYMPH', 'ZILCH',
                'GLINT', 'GRIPE', 'CLEFT', 'CRISP', 'KNACK'
            ]
        };
        return lists[difficulty] || lists.medium;
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

        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === secretLetters[i]) {
                feedback[i] = 'correct';
                secretLetters[i] = null;
                guessLetters[i] = null;
            }
        }

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
