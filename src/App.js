import logo from './logo.svg';
import './App.css';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';

function App() {
  return (
    <div className="game-wrapper">
      <GameBoard/>
      <Keyboard/>
    </div>
  );
}

export default App;
