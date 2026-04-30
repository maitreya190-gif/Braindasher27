export const COMPETITION_GAMES = [
  // â”€â”€ Eight Queens â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'eq-easy', game: 'Eight Queens', difficulty: 'Easy', component: 'EightQueens',
    points: 10,
    config: { boardSize: 4 },
    hint: 'Place 4 queens on a 4Ã—4 board so none attack each other.',
    goal: 'Place 4 queens on the board so that no two queens threaten each other.',
    rules: [
      'Click any empty cell to place a queen. Click it again to remove her.',
      'A queen attacks everything in her row, column, and both diagonals.',
      'No two queens may share a row, column, or diagonal.',
      'The board highlights conflicts in red â€” use this to guide you.',
      'The puzzle is solved the moment the 4th queen is placed legally.',
    ],
    controls: 'Mouse / Touch â€” click a cell to place or remove a queen.',
  },
  {
    id: 'eq-medium', game: 'Eight Queens', difficulty: 'Medium', component: 'EightQueens',
    points: 20,
    config: { boardSize: 6 },
    hint: 'Place 6 queens on a 6Ã—6 board so none attack each other.',
    goal: 'Place 6 queens on the board so that no two queens threaten each other.',
    rules: [
      'Click any empty cell to place a queen. Click again to remove her.',
      'A queen attacks everything in her row, column, and both diagonals.',
      'No two queens may share a row, column, or diagonal.',
      'Red highlights show conflicts â€” rearrange queens until there are none.',
    ],
    controls: 'Mouse / Touch â€” click a cell to place or remove a queen.',
  },
  {
    id: 'eq-hard', game: 'Eight Queens', difficulty: 'Hard', component: 'EightQueens',
    points: 40,
    config: { boardSize: 8 },
    hint: 'The classic 8-queens puzzle â€” no queen may threaten another.',
    goal: 'Place 8 queens on a standard 8Ã—8 chessboard with no two threatening each other.',
    rules: [
      'Click any empty cell to place a queen. Click again to remove her.',
      'A queen attacks the entire row, column, and both diagonals she sits on.',
      'All 8 queens must coexist without any conflicts.',
      'There are 92 distinct solutions â€” you only need to find one.',
    ],
    controls: 'Mouse / Touch â€” click a cell to place or remove a queen.',
  },

  // â”€â”€ Memory Master â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'mm-easy', points: 10, game: 'Memory Master', difficulty: 'Easy', component: 'MemoryMaster',
    config: { rows: 4, cols: 4 },
    hint: 'Match all 8 pairs of cards on a 4Ã—4 grid.',
    goal: 'Flip cards two at a time to find all matching pairs.',
    rules: [
      'Click any face-down card to flip it and reveal its symbol.',
      'Then click a second card. If the symbols match, both cards stay face-up.',
      'If they do not match, both cards flip back â€” remember what you saw!',
      'Match all pairs to win. Fewer moves = higher score.',
    ],
    controls: 'Mouse / Touch â€” click a card to flip it.',
  },
  {
    id: 'mm-medium', points: 20, game: 'Memory Master', difficulty: 'Medium', component: 'MemoryMaster',
    config: { rows: 4, cols: 6 },
    hint: 'Match all 12 pairs on a 4Ã—6 grid.',
    goal: 'Flip cards two at a time to find all 12 matching pairs.',
    rules: [
      'Click any face-down card to flip it and reveal its symbol.',
      'Click a second card â€” if they match, they stay up; otherwise they flip back.',
      'You have more cards to track this round, so pay close attention!',
      'Match all pairs to complete the round.',
    ],
    controls: 'Mouse / Touch â€” click a card to flip it.',
  },
  {
    id: 'mm-hard', points: 40, game: 'Memory Master', difficulty: 'Hard', component: 'MemoryMaster',
    config: { rows: 6, cols: 6 },
    hint: 'Match all 18 pairs on a 6Ã—6 grid.',
    goal: 'Find all 18 matching pairs on a large 6Ã—6 grid.',
    rules: [
      'Flip two cards per turn â€” matching pairs stay face-up.',
      'Non-matching pairs flip back after a brief moment.',
      'With 36 cards to track, concentration is everything.',
      'Match every pair before time runs out to complete the round.',
    ],
    controls: 'Mouse / Touch â€” click a card to flip it.',
  },

  // ── Circle of Hanoi ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'ch-easy', points: 10, game: 'Circle of Hanoi', difficulty: 'Easy', component: 'CircleOfHanoi',
    config: { discCount: 3 },
    hint: 'Random starting position, move to adjacent pegs in circle. Minimum 13 moves.',
    goal: 'Move all discs to peg B (target) using only adjacent pegs in a circular arrangement.',
    rules: [
      'Pegs are arranged in a CIRCLE: A-B-C-A. You can only move to adjacent pegs.',
      'You may only move ONE disc at a time from the TOP of a peg.',
      'A LARGER disc may NEVER be placed on top of a SMALLER disc.',
      'Each student gets a RANDOM starting configuration — no two puzzles are the same.',
      'Target: move all discs to peg B. The circular constraint makes this significantly harder!',
    ],
    controls: 'Click peg to select, then click adjacent peg to move to (only adjacent moves allowed).',
  },
  {
    id: 'ch-medium', points: 20, game: 'Circle of Hanoi', difficulty: 'Medium', component: 'CircleOfHanoi',
    config: { discCount: 4 },
    hint: 'Random 4-disc puzzle with circular peg movement. Minimum 40 moves.',
    goal: 'Move 4 discs to peg B following circular adjacency rules.',
    rules: [
      'Pegs A, B, C form a circle: can only move to adjacent pegs (A↔B, B↔C, C↔A).',
      'Only the top disc from any peg can be moved.',
      'Larger discs cannot sit on smaller discs.',
      'Random starting config every time — each student faces a unique puzzle.',
      'The circular topology adds significant complexity compared to linear Tower of Hanoi.',
    ],
    controls: 'Click peg to select, then click adjacent peg to move to.',
  },
  {
    id: 'ch-hard', points: 40, game: 'Circle of Hanoi', difficulty: 'Hard', component: 'CircleOfHanoi',
    config: { discCount: 5 },
    hint: 'Random 5-disc puzzle in circular formation. Minimum 121 moves.',
    goal: 'Move 5 discs to peg B — circle movement makes this extremely challenging.',
    rules: [
      'Circular peg arrangement: A-B-C-A. You MUST move to adjacent pegs only.',
      'One disc at a time, only from the top of a peg.',
      'Larger discs cannot be placed on smaller discs.',
      'Random starting configuration — completely different every time.',
      'This is a creative variation of Tower of Hanoi with significantly increased difficulty!',
    ],
    controls: 'Click peg to select, then click adjacent peg (moves only to adjacent pegs allowed).',
  },


  // â”€â”€ Wordle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'wo-easy', points: 10, game: 'Wordle', difficulty: 'Easy', component: 'Wordle',
    config: { maxAttempts: 8, wordDifficulty: 'easy' },
    hint: 'Guess a common 5-letter word in 8 attempts.',
    goal: 'Guess the secret 5-letter English word within 8 attempts.',
    rules: [
      'Type any 5-letter word and press Enter to submit your guess.',
      'ðŸŸ© GREEN tile â€” correct letter in the correct position.',
      'ðŸŸ¨ YELLOW tile â€” the letter is in the word but in the wrong position.',
      'â¬› GREY tile â€” the letter does not appear in the word at all.',
      'Use the colour clues to narrow down the word with each guess.',
      'The word is a common everyday English word this round.',
    ],
    controls: 'Keyboard â€” type letters and press Enter. Backspace to delete.',
  },
  {
    id: 'wo-medium', points: 20, game: 'Wordle', difficulty: 'Medium', component: 'Wordle',
    config: { maxAttempts: 6, wordDifficulty: 'medium' },
    hint: 'Guess a 5-letter word in 6 attempts.',
    goal: 'Guess the secret 5-letter word within 6 attempts.',
    rules: [
      'Type any 5-letter word and press Enter to submit.',
      'ðŸŸ© GREEN â€” right letter, right position.',
      'ðŸŸ¨ YELLOW â€” right letter, wrong position.',
      'â¬› GREY â€” letter not in the word.',
      'The word may be less common than the easy round â€” think broadly!',
    ],
    controls: 'Keyboard â€” type letters and press Enter. Backspace to delete.',
  },
  {
    id: 'wo-hard', points: 40, game: 'Wordle', difficulty: 'Hard', component: 'Wordle',
    config: { maxAttempts: 5, wordDifficulty: 'hard' },
    hint: 'Only 5 attempts. Unusual letter pattern.',
    goal: 'Guess the secret 5-letter word in just 5 attempts.',
    rules: [
      'Type a 5-letter word and press Enter.',
      'ðŸŸ© GREEN â€” correct letter, correct position.',
      'ðŸŸ¨ YELLOW â€” correct letter, wrong position.',
      'â¬› GREY â€” letter absent from the word.',
      'Only 5 attempts â€” every guess must count. The word has an unusual pattern.',
    ],
    controls: 'Keyboard â€” type letters and press Enter. Backspace to delete.',
  },

  // â”€â”€ Mastermind â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'ms-easy', points: 10, game: 'Mastermind', difficulty: 'Easy', component: 'Mastermind',
    config: { codeLength: 4, numColors: 4, maxAttempts: 10 },
    hint: 'Crack a 4-peg code using 4 colours in 10 attempts.',
    goal: 'Deduce the secret 4-colour code using logic and feedback.',
    rules: [
      'The secret code is a sequence of 4 coloured pegs chosen from 4 colours.',
      'Colours CAN repeat in the code (e.g. Red Red Blue Green is valid).',
      'Set each position to a colour using the buttons, then press "Submit Guess".',
      'ðŸŸ¢ GREEN dot in feedback = right colour in the right position.',
      'ðŸŸ¡ YELLOW dot in feedback = right colour but in the wrong position.',
      'IMPORTANT: The feedback shows COUNTS for the whole guess â€” not per-position.',
      'Example: If the code is [Red, Blue, Green, Yellow] and you guess [Red, Red, Red, Red], you get 1 green â€” because only ONE Red exists in the code.',
    ],
    controls: 'Click colour buttons to set each position, then press Submit Guess.',
  },
  {
    id: 'ms-medium', points: 20, game: 'Mastermind', difficulty: 'Medium', component: 'Mastermind',
    config: { codeLength: 4, numColors: 6, maxAttempts: 10 },
    hint: 'Crack a 4-peg code using 6 colours in 12 attempts.',
    goal: 'Deduce the secret 4-colour code from a palette of 6 colours.',
    rules: [
      'The code is 4 pegs long, chosen from 6 possible colours. Repeats allowed.',
      'Set each position to a colour, then press "Submit Guess".',
      'ðŸŸ¢ GREEN = right colour, right position.',
      'ðŸŸ¡ YELLOW = right colour, wrong position.',
      'Feedback counts are for the WHOLE GUESS â€” not tied to specific positions.',
      'If you guess the same colour multiple times, you only score feedback for as many times as it appears in the code.',
    ],
    controls: 'Click colour buttons to set each position, then press Submit Guess.',
  },
  {
    id: 'ms-hard', points: 40, game: 'Mastermind', difficulty: 'Hard', component: 'Mastermind',
    config: { codeLength: 5, numColors: 8, maxAttempts: 12 },
    hint: 'Crack a 5-peg code from 8 colours in 16 attempts.',
    goal: 'Deduce the secret 5-colour code from a palette of 8 colours in only 7 tries.',
    rules: [
      'The code is 5 pegs long, chosen from 8 colours. Repeats allowed.',
      'ðŸŸ¢ GREEN = right colour, right position.',
      'ðŸŸ¡ YELLOW = right colour, wrong position.',
      'Feedback is a COUNT for the whole guess â€” not one dot per position.',
      'A colour appearing N times in the code scores feedback for at most N pegs, even if you guessed it more times.',
      'Only 7 attempts â€” use information from every guess efficiently.',
    ],
    controls: 'Click colour buttons to set each position, then press Submit Guess.',
  },
];

export const TOTAL_COMPETITION_TIME = 45 * 60; // 45 minutes in seconds

