import GuessRow from "./GuessRow";

function GameBoard(props) {
    // TODO: 6 and 7 version?
    const rows = props.gameState.filter((v,k) => k.startsWith('row') && k !== 'rowComplete' && k !== 'rowEmpty') // TODO: deal with this
                   .sortBy((v,k) => k, (k1,k2) => k1.localeCompare(k2))
                   .map((rowObj,k) => 
                    <GuessRow key={k}
                        rangeStart={rowObj.get('start')} 
                        rangeLength={rowObj.get('length')}
                        guess={rowObj.get('value')}
                        score={rowObj.get('score')}/>
                   ).toSetSeq()
                   .toArray();
    
    return ( 
        <div className="board">
            {rows}   
        </div>
    );

}

export default GameBoard;