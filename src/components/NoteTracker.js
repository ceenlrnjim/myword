import {useState} from 'react';
import {useSelector} from 'react-redux';

import LetterRow from './LetterRow';

function NoteTracker(props) {
    const [columnsCrossed, setColumnCrossed] = useState({ '1': false, '2': false, '3': false, '4': false, '5': false, '6': false });
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rows = letters.split('').map((letter, ix) => <LetterRow key={ix} letter={letter} columnsCrossed={columnsCrossed} />);
    const showNotes = useSelector(state => state.get('showNotes'));

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
        <div className={"note_tracker" + (showNotes ? '' : ' hidden')}>
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