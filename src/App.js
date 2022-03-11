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
        {gameState.get('gameOver') && <EndGameModal answer={gameState.get('targetWord')} score={gameState.get('totalScore')}/>}
        <GameBoard gameState={gameState}/>
        <Keyboard 
          enterEnabled={gameState.get('rowComplete') && !gameState.get('gameOver')}
          backEnabled={!gameState.get('rowEmpty') && !gameState.get('gameOver')}
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
