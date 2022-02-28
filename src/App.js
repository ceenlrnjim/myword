import {useReducer, useState} from 'react';
import {GameStateReducer, initialState} from './StateLogic';
import './App.css';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import EndGameModal from './components/EndGameModal';
import NoteTracker from './components/NoteTracker';



function App() {
  const [gameState, dispatchGameState] = useReducer(GameStateReducer, initialState);
  const [showNotes, setShowNotes] = useState(false);

  function notesToggleHandler() {
    setShowNotes((prev) => !prev);
  }

  function guessHandler(letter) {
    dispatchGameState({type:'ENTER_LETTER', letter: letter})
  }

  function enterGuessHandler() {
    dispatchGameState({type:'CHECK_GUESS'});
  }

  function backSpaceHandler() {
    dispatchGameState({type:'DELETE_LETTER'});
  }

  return (
    <div className="top_wrapper">
      <div className="game_wrapper">
        {gameState.gameOver && <EndGameModal answer={gameState.targetWord} score={gameState.totalScore}/>}
        <GameBoard gameState={gameState}/>
        <Keyboard 
          enterEnabled={gameState.rowComplete && !gameState.gameOver}
          backEnabled={!gameState.rowEmpty && !gameState.gameOver}
          onLetterGuess={guessHandler} 
          onEnterGuess={enterGuessHandler} 
          toggleNotes={notesToggleHandler}
          onBackSpace={backSpaceHandler}/>
      </div>
      <NoteTracker showNotes={showNotes} />
    </div>
  );
}

export default App;
