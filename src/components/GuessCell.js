function GuessCell(props) {
    const index = +(props.index);
    const start = +(props.rangeStart);
    const len = +(props.rangeLength);
    const isGuess = index >= start && index < start+len;
    const className = isGuess ? 'board_row_guess' : 'board_row_background';
    return <div className={className}><p>{isGuess && index=== 4 && 'S'}</p></div>

}

export default GuessCell;