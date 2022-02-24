import {useState} from 'react';

import LetterRow from './LetterRow';

function NoteTracker() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rows = letters.split('').map((letter,ix) => <LetterRow key={ix} letter={letter}/>);

    return (
        <div className="note_tracker">
            {rows}
        </div>
    );
}

export default NoteTracker;