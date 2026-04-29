# Development Guide - BrainDasher Spectrum 2027

## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:3000`

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
BrainDasher27/
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Root component
│   ├── App.css                  # App styles
│   │
│   ├── pages/                   # Page components
│   │   ├── Home.jsx             # Home page with game selection
│   │   ├── Home.css
│   │   ├── GameRoom.jsx         # Game play area
│   │   ├── GameRoom.css
│   │   ├── Leaderboard.jsx      # Leaderboard view
│   │   ├── Leaderboard.css
│   │   ├── GameResult.jsx       # Game result display
│   │   └── GameResult.css
│   │
│   ├── games/                   # Game components and logic
│   │   ├── config.json          # Game configurations
│   │   ├── EightQueens.jsx      # Game component
│   │   ├── EightQueens.css
│   │   ├── MemoryMaster.jsx
│   │   ├── MemoryMaster.css
│   │   ├── TowerOfHanoi.jsx
│   │   ├── TowerOfHanoi.css
│   │   ├── Wordle.jsx
│   │   ├── Wordle.css
│   │   ├── Mastermind.jsx
│   │   ├── Mastermind.css
│   │   │
│   │   ├── eight-queens/        # Game logic
│   │   │   └── game.js
│   │   ├── memory-master/
│   │   │   └── game.js
│   │   ├── tower-of-hanoi/
│   │   │   └── game.js
│   │   ├── wordle/
│   │   │   └── game.js
│   │   └── mastermind/
│   │       └── game.js
│   │
│   ├── components/              # Reusable components
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Timer.jsx
│   │   ├── Timer.css
│   │   ├── ScoreDisplay.jsx
│   │   ├── ScoreDisplay.css
│   │   ├── GameCard.jsx
│   │   ├── GameCard.css
│   │   ├── Modal.jsx
│   │   ├── Modal.css
│   │   ├── Spinner.jsx
│   │   └── Spinner.css
│   │
│   ├── utils/                   # Utility functions
│   │   ├── helpers.js           # Helper functions
│   │   ├── storage.js           # LocalStorage utilities
│   │   ├── hooks.js             # Custom React hooks
│   │   └── constants.js         # App constants
│   │
│   ├── styles/                  # Global styles
│   │   ├── global.css           # Global styling
│   │   └── theme.css            # Theme and gaming vibe
│   │
│   └── assets/
│       ├── images/              # Game images
│       ├── sounds/              # Game sounds
│       └── fonts/               # Custom fonts
│
├── public/                      # Static files
├── package.json
├── vite.config.js              # Vite configuration
├── .eslintrc.json              # ESLint config
├── .prettierrc                 # Prettier config
├── .gitignore
├── README.md
└── DEVELOPMENT.md              # This file
```

## Technology Stack

### Frontend Framework
- **React 18** - UI library
- **React Router** - Page routing
- **Vite** - Build tool
- **CSS3** - Styling (no framework, vanilla CSS with custom properties)

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GSAP** - Animation library (optional)

### Build & Deployment
- Vite for optimized builds
- Support for modern browsers

## Game Architecture

### Game Flow
1. User selects a game from the home page
2. Game component mounts with game logic instance
3. Timer starts counting down
4. Player interacts with game UI
5. Game logic updates based on player actions
6. On completion/timeout, score is calculated
7. Result page shows score and player info
8. Result is added to leaderboard

### Creating a New Game

To add a new game:

1. **Create game logic** (`src/games/[game-name]/game.js`)
   ```javascript
   export class MyGame {
     constructor() { /* ... */ }
     // Game methods
   }
   ```

2. **Create game component** (`src/games/MyGame.jsx`)
   ```javascript
   import { MyGame } from '../games/[game-name]/game';
   function MyGameComponent({ onGameEnd, timeLimit }) {
     // Component logic
   }
   export default MyGameComponent;
   ```

3. **Add game to config** (`src/games/config.json`)
   ```json
   {
     "id": 6,
     "title": "My Game",
     "difficulty": "Medium",
     // ... other properties
   }
   ```

4. **Update App.jsx** to import and route the new game

## Key Features

### 1. **Responsive Design**
- Mobile-first approach
- Adapts to tablets and desktops
- Touch-friendly controls

### 2. **Gaming Vibe**
- Dark theme with neon accents
- Smooth animations
- Interactive feedback
- Sound effects ready (integrate via assets/sounds)

### 3. **Performance**
- Code splitting with Vite
- Optimized bundle size
- Fast load times
- Efficient re-renders

### 4. **User Experience**
- Player name customization
- Score tracking and leaderboard
- Time limits for challenges
- Progress indicators
- Modal feedback

### 5. **Accessibility**
- Semantic HTML
- Clear color contrast
- Keyboard navigation ready
- ARIA labels (can be enhanced)

## State Management

Currently using:
- React Context (via props drilling in App.jsx)
- React Hooks (useState, useEffect)
- LocalStorage for persistence

For scaling, consider:
- Redux
- Zustand
- Jotai

## Styling Guidelines

### CSS Architecture
- Global styles in `global.css`
- Theme variables in `theme.css`
- Component-specific styles in `.css` files
- CSS Custom Properties for theming

### Color Palette
```
Primary: #FF006E (Pink)
Secondary: #00D9FF (Cyan)
Accent: #FFD60A (Yellow)
Dark BG: #0A0E27
Card BG: #1A1F3A
```

### Font
- Headings: 'Orbitron' (gaming feel)
- Body: 'Space Mono' (monospace, technical)

## Performance Optimization

### Current Optimizations
1. Code splitting by route
2. Lazy loading components
3. Minified CSS and JS
4. Optimized bundle size

### Future Optimizations
1. Add image compression
2. Implement service workers
3. Add resource hints (preconnect, prefetch)
4. Use React.memo for heavy components
5. Implement virtual scrolling for leaderboard

## Testing

To add tests:

```bash
npm install --save-dev vitest @testing-library/react
```

Create `__tests__` folders alongside components and add test files.

## Deployment

### Build
```bash
npm run build
```

Output in `dist/` directory

### Deployment Platforms
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

### Environment Variables
Create `.env.local`:
```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=BrainDasher
```

## Debugging

### Browser DevTools
- React DevTools extension
- Redux DevTools (if Redux is added)
- Network tab for API calls

### Console Logging
Already implemented in components for debugging

### Vite Debug Mode
```bash
npm run dev -- --debug
```

## Common Issues & Solutions

### Issue: Module not found
**Solution**: Check import paths, ensure file exists in correct location

### Issue: Styles not applying
**Solution**: Check CSS file is imported, class names match, CSS specificity

### Issue: Game not starting
**Solution**: Check onGameEnd callback, ensure game logic instance created

### Issue: LocalStorage errors
**Solution**: Check browser storage limit, use storage utilities from `utils/storage.js`

## Contributing Guidelines

1. Create feature branches: `git checkout -b feature/name`
2. Follow ESLint rules: `npm run lint`
3. Format code: `npm run format`
4. Test thoroughly before committing
5. Write meaningful commit messages
6. Create pull requests with descriptions

## Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [MDN Web Docs](https://developer.mozilla.org)

## Support & Contact

For issues or questions:
- Create an issue in the repository
- Contact: development@pccoe.edu.in

---

**Happy Coding! 🎮✨**
