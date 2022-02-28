import computeScore from './components/Scoring';
import pickWord from './sixes';

export const initialState = {
  targetWord: pickWord(),
  totalScore: 0,
  currentRow: 1,
  gameOver: false,
  rowComplete: false,
  rowEmpty: true,
  row1: { value:'', start:0, length: 2},
  row2: { value:'', start:0, length: 3},
  row3: { value:'', start:1, length: 3},
  row4: { value:'', start:2, length: 3},
  row5: { value:'', start:3, length: 3},
  row6: { value:'', start:2, length: 4},
  row7: { value:'', start:1, length: 4},
  row8: { value:'', start:0, length: 4},
  row9: { value:'', start:0, length: 5},
  row10: { value:'', start:1, length: 5},
  row11: { value:'', start:0, length: 6}
}

function bootstrapNewState(prevState) {
  const newState = {...prevState};
  const row = 'row' + newState.currentRow;
  return [newState, row];
}

function stateWithModifiedValue(prevState, modifier, score) {
    const [newState, row] = bootstrapNewState(prevState); 
    newState[row] = {...newState[row], value: modifier(newState[row].value)};
    newState.rowEmpty = (newState[row].value.length === 0);
    newState.rowComplete = (newState[row].value.length === newState[row].length);
    return newState;
}

function enterLetter(gameState, action) {
    if (!gameState.rowComplete && !gameState.gameOver) {
        return stateWithModifiedValue(gameState, v => v + action.letter);
    } else {
        return gameState;
    }
}

function checkGuess(gameState, action) {
    if (gameState.rowComplete) {
        const [newState, row] = bootstrapNewState(gameState);
        const score = computeScore(gameState.targetWord, newState[row].value, newState[row].start, newState[row].length);
        newState.totalScore += score;
        newState[row] = {...newState[row], score: score};
        newState.rowEmpty = true;
        newState.rowComplete = false;
        if (newState.currentRow < 11) {
          newState.currentRow += 1;
        } else {
          newState.gameOver = true;
        } 

        return newState;
    } else {
        return gameState; // no change
    }
}

function deleteLetter(gameState, action) {
    if (!gameState.rowEmpty && !gameState.gameOver) {
        return stateWithModifiedValue(gameState, v => v.substring(0,v.length-1));
    } else {
        return gameState; // no change
    }
}

const handlers = {
    'ENTER_LETTER': enterLetter,
    'CHECK_GUESS': checkGuess,
    'DELETE_LETTER': deleteLetter
}

export function GameStateReducer(state, action) {
    return handlers[action.type](state, action);
}