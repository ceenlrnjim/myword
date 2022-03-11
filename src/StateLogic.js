import computeScore from './components/Scoring';
import pickWord from './sixes';
import {Map,List, fromJS} from 'immutable';

export const initialState = fromJS({
  targetWord: pickWord(),
  totalScore: 0,
  currentRow: 'row1',
  gameOver: false,
  rowComplete: false,
  rowEmpty: true,
  row1: { value:'', start:0, length: 2, nextRow: 'row2'},
  row2: { value:'', start:0, length: 3, nextRow: 'row3'},
  row3: { value:'', start:1, length: 3, nextRow: 'row4'},
  row4: { value:'', start:2, length: 3, nextRow: 'row5'},
  row5: { value:'', start:3, length: 3, nextRow: 'row6'},
  row6: { value:'', start:2, length: 4, nextRow: 'row7'},
  row7: { value:'', start:1, length: 4, nextRow: 'row8'},
  row8: { value:'', start:0, length: 4, nextRow: 'row9'},
  row9: { value:'', start:0, length: 5, nextRow: 'rowA'},
  rowA: { value:'', start:1, length: 5, nextRow: 'rowB'},
  rowB: { value:'', start:0, length: 6, nextRow: null}
});

function enterLetter(gameState, action) {
    if (!gameState.get('rowComplete') && !gameState.get('gameOver')) {
        const currentRow = gameState.get('currentRow');
        const newState = gameState.updateIn([currentRow, 'value'], value => value + action.letter)
                                    .set('rowEmpty', false)
                                    .update(me => me.set('rowComplete', me.getIn([currentRow, 'value']).length === me.getIn([currentRow,'length'])));

        return newState;
    } else {
        return gameState;
    }
}

function checkGuess(gameState, action) {
    if (gameState.get('rowComplete')) {
        const currentRow = gameState.get('currentRow');
        const score = computeScore(gameState.get('targetWord'), 
                                   gameState.getIn([currentRow, 'value']), 
                                   gameState.getIn([currentRow, 'start']), 
                                   gameState.getIn([currentRow, 'length']));

        const newState = gameState.update('totalScore', total => total + score)
                                  .setIn([currentRow, 'score'], score)
                                  .set('rowEmpty', true)
                                  .set('rowComplete', false)
                                  .update(me => {
                                      const nextRow = me.getIn([currentRow, 'nextRow']);
                                      return (nextRow) ? me.set('currentRow', nextRow) : me.set('gameOver', true);
                                  });
        
        return newState;
    } else {
        return gameState; // no change
    }
}

function deleteLetter(gameState, action) {
    if (!gameState.get('rowEmpty') && !gameState.get('gameOver')) {
        const currentRow = gameState.get('currentRow');
        const value = gameState.getIn([currentRow,'value']);
        const newState = gameState.updateIn([currentRow, 'value'], v => v.substring(0,v.length-1))
                                    .set('rowEmpty', value.length > 1)
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

export function GameStateReducer(state, action) {
    return handlers[action.type](state, action);
}