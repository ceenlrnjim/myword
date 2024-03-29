import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { actions } from '../StateLogic';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function isLetter(key) {
    return key.length === 1 && letters.indexOf(key.toUpperCase()) >= 0;
}

function Keyboard(props) {
    const dispatchGameState = useDispatch();
    const {rowComplete, rowEmpty} = useSelector(state => ({rowComplete: state.rowComplete, rowEmpty: state.rowEmpty}));

    const enterEnabled = rowComplete;
    const backEnabled = !rowEmpty;
    
    const notesHandler = (event) => {
        event.target.blur();
        dispatchGameState(actions.toggleNotes());
    }

    function letterPressHandler(event) {
        letterHandler(event.target.textContent);
    }

    function letterHandler(letter) {
        dispatchGameState(actions.enterLetter(letter));
    }

    function enterPressHandler() {
        dispatchGameState(actions.checkGuess());
    }

    function backPressHandler() {
        dispatchGameState(actions.deleteLetter());
    }

    useEffect(() => {
        document.body.onkeydown = function(event) {
            if (event.key === 'Del' || event.key === 'Backspace') {
                backPressHandler();
            } else if (event.key === 'Go' || event.key === 'Enter') {
                enterPressHandler();
            } else if (isLetter(event.key)) {
                letterHandler(event.key.toUpperCase());
            }
        }
        // these never really change in this application, but want to get rid of the warning
    },[dispatchGameState]);

    return  (
        <div className="keyboard">
            <div className="keyboard__row"> 
                <button className="keyboard__row__key" onClick={letterPressHandler}>Q</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>W</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>E</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>R</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>T</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>Y</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>U</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>I</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>O</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>P</button>
            </div>
            <div className="keyboard__row">
                <button className="keyboard__row__key" onClick={letterPressHandler}>A</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>S</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>D</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>F</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>G</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>H</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>J</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>K</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>L</button>
            </div>
            <div className="keyboard__row">
                <button className="keyboard__row__key" onClick={enterPressHandler} disabled={!enterEnabled}>&#8627;</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>Z</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>X</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>C</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>V</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>B</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>N</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>M</button>
                <button className="keyboard__row__key" onClick={backPressHandler} disabled={!backEnabled}>&#9003;</button>
                <button className="keyboard__row__key" onClick={notesHandler} type="button">&#9072;</button>
            </div>
            <div className="keyboard__row">
            </div>
        </div>
    );
}

export default Keyboard;