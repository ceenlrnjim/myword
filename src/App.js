import logo from './logo.svg';
import './App.css';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';

function App() {
  function guessHandler(letter) {
    console.log("Added Guess", letter);
  }

  function enterGuessHandler() {
    // TODO: track if current row is full and enable/disable the enter button
    console.log("Enter pressed");
  }

  function backSpaceHandler() {
    // TODO: track if there are any entries in the current row and enable/disable the back button
    console.log("back pressed");
  }

  return (
    <div className="game-wrapper">
      <GameBoard/>
      <Keyboard onLetterGuess={guessHandler} onEnterGuess={enterGuessHandler} onBackSpace={backSpaceHandler}/>
    </div>
  );
}

export default App;
