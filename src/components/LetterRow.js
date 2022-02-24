import React, { useState } from 'react';
import PositionalLetter from './PositionalLetter';
function LetterRow(props) {
    const [crossed, setCrossed] = useState(false);
    function rowXHandler() {
        setCrossed((prevState) => !prevState);
    }

    return (
        <div className={`note_tracker_row ${crossed ?'strikethrough' : ''} `}>
            <PositionalLetter letter={props.letter}/>
            <PositionalLetter letter={props.letter}/>
            <PositionalLetter letter={props.letter}/>
            <PositionalLetter letter={props.letter}/>
            <PositionalLetter letter={props.letter}/>
            <PositionalLetter letter={props.letter}/>
            <div onClick={rowXHandler}>(x)</div>
        </div>
    );
}

export default LetterRow;