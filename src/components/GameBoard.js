import GuessRow from "./GuessRow";

function GameBoard(props) {
    // TODO: 6 and 7 version?
    const rows = [];
    for (var i=1;i<12;i++) {
        rows[i] = <GuessRow key={i} 
                    rangeStart={props.gameState['row'+i].start} 
                    rangeLength={props.gameState['row'+i].length} 
                    guess={props.gameState['row'+i].value} 
                    score={props.gameState['row'+i].score}/>
    }
    return ( 
        <div className="board">
            {rows}   
        </div>
    );

}

export default GameBoard;