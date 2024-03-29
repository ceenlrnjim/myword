import {createSlice, configureStore} from '@reduxjs/toolkit';

import computeScore from './components/Scoring';
import pickWord from './sixes';


export const rowConfig = {
    row0: { start:0, length: 2, nextRow: 'row1'},
    row1: { start:0, length: 3, nextRow: 'row2'},
    row2: { start:1, length: 3, nextRow: 'row3'},
    row3: { start:2, length: 3, nextRow: 'row4'},
    row4: { start:3, length: 3, nextRow: 'row5'},
    row5: { start:2, length: 4, nextRow: 'row6'},
    row6: { start:1, length: 4, nextRow: 'row7'},
    row7: { start:0, length: 4, nextRow: 'row8'},
    row8: { start:0, length: 5, nextRow: 'row9'},
    row9: { start:1, length: 5, nextRow: 'row10'},
    row10: { start:0, length: 6, nextRow: null}
}


export const initialState = {
  targetWord: pickWord(),
  showNotes: false,
  totalScore: 0,
  currentRow: 'row0',
  gameOver: false,
  rowComplete: false,
  rowEmpty: true,
  row0: '',
  row1: '',
  row2: '',
  row3: '',
  row4: '',
  row5: '',
  row6: '',
  row7: '',
  row8: '',
  row9: '',
  row10: '',
};

function enterLetter(gameState, action) {
    console.log("Letter entered: " + action.payload);
    if (!gameState.rowComplete && !gameState.gameOver) {
        const currentRow = gameState.currentRow;
        gameState[currentRow] = gameState[currentRow] + action.payload;
        gameState.rowComplete = gameState[currentRow].length === rowConfig[currentRow].length;
        gameState.rowEmpty = false;
    }
}

function checkGuess(gameState) {
    if (gameState.rowComplete) {
        const currentRow = gameState.currentRow;
        const score = computeScore(gameState.targetWord, gameState[currentRow], rowConfig[currentRow].start, rowConfig[currentRow].length);
        gameState.totalScore += score;
        gameState[currentRow + 'score'] = score;
        gameState.rowEmpty = true;
        gameState.rowComplete = false;
        const nextRow = rowConfig[currentRow].nextRow;
        if (nextRow) {
            gameState.currentRow = nextRow;
        } else {
            gameState.gameOver = true;
        }
    }
}

function deleteLetter(gameState) {
    if (!gameState.rowEmpty && !gameState.gameOver) {
        const currentRow = gameState.currentRow;
        gameState[currentRow] = gameState[currentRow].substring(0, gameState[currentRow].length-1);
        gameState.rowEmpty = gameState[currentRow].length === 0;
        gameState.rowComplete = false;
    }
}

function toggleNotes(gameState) {
    gameState.showNotes = !gameState.showNotes;
}

const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: initialState,
    reducers: {
        enterLetter,
        checkGuess,
        deleteLetter,
        toggleNotes
    }
});

const gameStateStore = configureStore({reducer: gameStateSlice.reducer});
export const actions = gameStateSlice.actions;

export default gameStateStore;