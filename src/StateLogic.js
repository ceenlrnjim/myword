import {createStore} from 'redux';

import computeScore from './components/Scoring';
import pickWord from './sixes';
import {Map,fromJS} from 'immutable';


export const initialState = fromJS({
  targetWord: pickWord(),
  totalScore: 0,
  currentRow: 'rowA',
  gameOver: false,
  rowComplete: false,
  rowEmpty: true,
  rows: {
    rowA: { value:'', start:0, length: 2, nextRow: 'rowB'},
    rowB: { value:'', start:0, length: 3, nextRow: 'rowC'},
    rowC: { value:'', start:1, length: 3, nextRow: 'rowD'},
    rowD: { value:'', start:2, length: 3, nextRow: 'rowE'},
    rowE: { value:'', start:3, length: 3, nextRow: 'rowF'},
    rowF: { value:'', start:2, length: 4, nextRow: 'rowG'},
    rowG: { value:'', start:1, length: 4, nextRow: 'rowH'},
    rowH: { value:'', start:0, length: 4, nextRow: 'rowI'},
    rowI: { value:'', start:0, length: 5, nextRow: 'rowJ'},
    rowJ: { value:'', start:1, length: 5, nextRow: 'rowK'},
    rowK: { value:'', start:0, length: 6, nextRow: null}
  }
});

// Let's get wild
Map.prototype.rowLength = function() {
    return this.getIn(['rows',this.get('currentRow'), 'length']);
}

Map.prototype.rowValue = function() {
    return this.getIn(['rows',this.get('currentRow'), 'value']);
}

Map.prototype.rowStart = function() {
    return this.getIn(['rows',this.get('currentRow'), 'start']);
}

function enterLetter(gameState, action) {
    if (!gameState.get('rowComplete') && !gameState.get('gameOver')) {
        const currentRow = gameState.get('currentRow');
        const newState = gameState.updateIn(['rows', currentRow, 'value'], value => value + action.letter)
                                    .set('rowEmpty', false)
                                    .update(me => me.set('rowComplete', me.rowValue().length === me.rowLength()));

        return newState;
    } else {
        return gameState;
    }
}

function checkGuess(gameState, action) {
    if (gameState.get('rowComplete')) {
        const currentRow = gameState.get('currentRow');
        const score = computeScore(gameState.get('targetWord'), 
                                   gameState.rowValue(),
                                   gameState.rowStart(),
                                   gameState.rowLength());

        const newState = gameState.update('totalScore', total => total + score)
                                  .setIn(['rows', currentRow, 'score'], score)
                                  .set('rowEmpty', true)
                                  .set('rowComplete', false)
                                  .update(me => {
                                      const nextRow = me.getIn(['rows', currentRow, 'nextRow']);
                                      return nextRow ? me.set('currentRow', nextRow) : me.set('gameOver', true);
                                  });
        
        return newState;
    } else {
        return gameState; // no change
    }
}

function deleteLetter(gameState, action) {
    if (!gameState.get('rowEmpty') && !gameState.get('gameOver')) {
        const newState = gameState.updateIn(['rows', gameState.get('currentRow'), 'value'], v => v.substring(0,v.length-1))
                                    .set('rowEmpty', gameState.rowValue().length === 1) // if it was 1 before the backspace, it is 0 now so empty
                                    .set('rowComplete', false);

        return newState;
    } else {
        return gameState;
    }
}

const handlers = {
    'ENTER_LETTER': enterLetter,
    'CHECK_GUESS': checkGuess,
    'DELETE_LETTER': deleteLetter
}

function gameStateReducer(state, action) {
    if (action && action.type && handlers[action.type]) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
}

const gameStateStore = createStore(gameStateReducer, initialState);

export default gameStateStore;