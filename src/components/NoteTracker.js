import {useState} from 'react';

import LetterRow from './LetterRow';

function NoteTracker() {
    const [columnsCrossed, setColumnCrossed] = useState({'1': false, '2': false, '3': false, '4': false, '5': false, '6': false});
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rows = letters.split('').map((letter,ix) => <LetterRow key={ix} letter={letter} columnsCrossed={columnsCrossed}/>);

    function crossColumnHandler(column) {
        return function(event) {
            setColumnCrossed((prevState) => { 
                console.log(event);
                const newState = {...prevState }
                newState[column] = event.target.checked;
                return newState;
            })
        };
    }

    return (
        <div className="note_tracker">
            {rows}
            <div className="note_tracker_row">
                <input type="checkbox" onClick={crossColumnHandler('1')}></input>
                <input type="checkbox" onClick={crossColumnHandler('2')}></input>
                <input type="checkbox" onClick={crossColumnHandler('3')}></input>
                <input type="checkbox" onClick={crossColumnHandler('4')}></input>
                <input type="checkbox" onClick={crossColumnHandler('5')}></input>
                <input type="checkbox" onClick={crossColumnHandler('6')}></input>
            </div>
        </div>
    );
}

export default NoteTracker;