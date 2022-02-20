import {useState} from 'react';
import sixLetterWords from './sixes';
import './App.css';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';

const initialState = {
  targetWord: 'grapes',
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

function stateWithModifiedValue(prevState, modifier, score) {
    const newState = {...prevState};
    const row = 'row' + newState.currentRow;
    newState[row] = {...newState[row], value: modifier(newState[row].value)};
    newState.rowEmpty = (newState[row].value.length === 0);
    newState.rowComplete = (newState[row].value.length === newState[row].length);
    if (score !== undefined) {
      newState[row].score = score;
    }
    console.log('Updating ', row, newState[row].value, 'complete:', newState.rowComplete, 'empty:', newState.rowEmpty);
    return newState;

}

function App() {
  const [gameState, setGameState] = useState(initialState);

  function guessHandler(letter) {
    if (!gameState.rowComplete && !gameState.gameOver) {
      setGameState((prevState) => {
        return stateWithModifiedValue(prevState, v => v + letter);
      });
    }
  }

  function enterGuessHandler() {
    if (gameState.rowComplete) {
      // TODO: compute score
      setGameState(prevState => {
        const score = 100;
        const newState = stateWithModifiedValue(prevState, v => v, score);
        newState.rowEmpty = true;
        newState.rowComplete = false;
        if (newState.currentRow < 11) {
          newState.currentRow += 1;
        } else {
          newState.gameOver = true;
        } 

        return newState;
      });
    }
  }

  function backSpaceHandler() {
    if (!gameState.rowEmpty && !gameState.gameOver) {
      setGameState((prevState) => {
          return stateWithModifiedValue(prevState, v => v.substring(0,v.length-1));
      })
  }
  }

  return (
    <div className="game-wrapper">
      <GameBoard gameState={gameState}/>
      <Keyboard 
        enterEnabled={gameState.rowComplete && !gameState.gameOver}
        backEnabled={!gameState.rowEmpty && !gameState.gameOver}
        onLetterGuess={guessHandler} 
        onEnterGuess={enterGuessHandler} 
        onBackSpace={backSpaceHandler}/>
    </div>
  );
}

export default App;
