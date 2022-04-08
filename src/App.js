import {useSelector} from 'react-redux';
import './App.css';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import EndGameModal from './components/EndGameModal';
import NoteTracker from './components/NoteTracker';


// TODO: is an advantage of redux that I can move these dispatch actions closer to where they are generated?

function App() {
  const {targetWord, totalScore, gameOver} = useSelector(state => { 
    return {gameOver: state.get('gameOver'), 
            totalScore: state.get('totalScore'), 
            targetWord: state.get('targetWord')}
  });

  return (
    <div className="top_wrapper">
      <div className="game_wrapper">
        {gameOver && <EndGameModal answer={targetWord} score={totalScore}/>}
        <GameBoard/>
        <Keyboard />
      </div>
      <NoteTracker />
    </div>
  );
}

export default App;
