
function Keyboard(props) {
    const letterPressHandler = (event) => props.onLetterGuess(event.target.textContent);
    const enterPressHandler = () => props.onEnterGuess();
    const backPressHandler = () => props.onBackSpace();


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
                <button className="keyboard__row__key" onClick={enterPressHandler}>Enter</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>Z</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>X</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>C</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>V</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>B</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>N</button>
                <button className="keyboard__row__key" onClick={letterPressHandler}>M</button>
                <button className="keyboard__row__key" onClick={backPressHandler}>Back</button>
            </div>
            <div className="keyboard__row">
            </div>
        </div>
    );
}

export default Keyboard;