import {useState} from 'react';

function PositionalLetter(props) {
    const [crossed, setCrossed] = useState(false);
    function rowXHandler() {
        setCrossed((prevState) => !prevState);
    }
    return (
        <div className={`note_tracker_row_letter ${crossed ? 'strikethrough' : ''} `} onClick={rowXHandler}>{props.letter}</div>
    );
}

export default PositionalLetter;