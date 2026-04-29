import React, { createContext, useContext, useReducer } from 'react';

const CompetitionContext = createContext(null);

const initialState = {
  prn: null,
  bonusScore: null,
  competition: {
    startTime: null,
    currentGameIndex: 0,
    gameResults: [],
    isActive: false,
    isComplete: false,
    totalTimeUsed: 0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRN':
      return { ...state, prn: action.prn };

    case 'START_COMPETITION':
      return {
        ...state,
        competition: {
          ...initialState.competition,
          startTime: Date.now(),
          isActive: true,
        },
      };

    case 'RECORD_GAME': {
      const results = [...state.competition.gameResults];
      results[state.competition.currentGameIndex] = action.result;
      return { ...state, competition: { ...state.competition, gameResults: results } };
    }

    case 'ADVANCE_GAME':
      return {
        ...state,
        competition: {
          ...state.competition,
          currentGameIndex: state.competition.currentGameIndex + 1,
        },
      };

    case 'END_COMPETITION':
      return {
        ...state,
        competition: {
          ...state.competition,
          isActive: false,
          isComplete: true,
          totalTimeUsed: action.timeUsed,
        },
      };

    case 'RECORD_BONUS':
      return { ...state, bonusScore: action.score };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function CompetitionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CompetitionContext.Provider value={{ state, dispatch }}>
      {children}
    </CompetitionContext.Provider>
  );
}

export function useCompetition() {
  const ctx = useContext(CompetitionContext);
  if (!ctx) throw new Error('useCompetition must be inside CompetitionProvider');
  return ctx;
}
