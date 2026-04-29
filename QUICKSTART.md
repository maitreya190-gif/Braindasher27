# Quick Start Guide

## Installation & Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

### Step 3: Play the Games!
- Select a game from the home page
- Complete the challenge before time runs out
- Check your score on the leaderboard

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code for errors |
| `npm run format` | Format code with Prettier |

## Project Structure Overview

```
src/
├── pages/          → Home, Games, Leaderboard, Results
├── games/          → Game logic and UI components
├── components/     → Reusable UI elements
├── utils/          → Helper functions and hooks
├── styles/         → Global CSS and theme
└── assets/         → Images, sounds, fonts
```

## File Naming Convention

- Components: `PascalCase.jsx` (e.g., `Header.jsx`)
- Styles: `PascalCase.css` (matches component)
- Utilities: `camelCase.js` (e.g., `helpers.js`)
- Folders: `kebab-case` (e.g., `memory-master/`)

## Key Features

✅ **5 Unique Games** - Progressive difficulty  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Leaderboard System** - Track scores globally  
✅ **Gaming UI** - Dark theme with neon accents  
✅ **Time Challenges** - Race against the clock  

## Adding a New Game

1. Create game logic: `src/games/[name]/game.js`
2. Create component: `src/games/[Name].jsx`
3. Add styling: `src/games/[Name].css`
4. Update `config.json` with game details
5. Update `App.jsx` routing

See `DEVELOPMENT.md` for detailed guide.

## Customization

### Change Branding
- Edit `src/components/Header.jsx` (logo)
- Update `README.md` title
- Modify `src/index.html` title tag

### Adjust Colors
Edit CSS variables in `src/styles/theme.css`:
```css
:root {
    --primary: #FF006E;      /* Main color */
    --secondary: #00D9FF;    /* Accent color */
    --accent: #FFD60A;       /* Highlight color */
}
```

### Change Game Times
Edit `src/games/config.json`:
```json
{
  "timeLimit": 600  // Time in seconds
}
```

## Build & Deploy

### Build for Production
```bash
npm run build
```

Output files in `dist/` folder

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- --port 3001
```

**Build errors?**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Styles not loading?**
- Check CSS file imports
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors

## Next Steps

1. ✅ Install dependencies (`npm install`)
2. ✅ Start development (`npm run dev`)
3. ✅ Explore the games
4. ✅ Customize as needed
5. ✅ Deploy to production

## Support

For help and documentation:
- See `DEVELOPMENT.md` for detailed guide
- Check components for inline comments
- Review game logic in `src/games/*/game.js`

**Enjoy building! 🚀**
