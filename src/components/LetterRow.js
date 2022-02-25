import React, { useState } from 'react';
import PositionalLetter from './PositionalLetter';
function LetterRow(props) {
    const [crossed, setCrossed] = useState(false);

    function rowXHandler(event) {
        setCrossed(event.target.checked);
    }

    return (
        <div className='note_tracker_row'>
            <PositionalLetter letter={props.letter} crossed={crossed || props.columnsCrossed['1']}/>
            <PositionalLetter letter={props.letter} crossed={crossed || props.columnsCrossed['2']}/>
            <PositionalLetter letter={props.letter} crossed={crossed || props.columnsCrossed['3']}/>
            <PositionalLetter letter={props.letter} crossed={crossed || props.columnsCrossed['4']}/>
            <PositionalLetter letter={props.letter} crossed={crossed || props.columnsCrossed['5']}/>
            <PositionalLetter letter={props.letter} crossed={crossed || props.columnsCrossed['6']}/>
            <input type="checkbox" onClick={rowXHandler}></input>
        </div>
    );
}

export default LetterRow;