import GuessRow from "./GuessRow";

function GameBoard(props) {
    // TODO: 6 and 7 version?
    return ( 
        <div className="board">
            <GuessRow rangeStart="0" rangeLength="2"/>
            <GuessRow rangeStart="0" rangeLength="3"/>
            <GuessRow rangeStart="1" rangeLength="3"/>
            <GuessRow rangeStart="2" rangeLength="3"/>
            <GuessRow rangeStart="3" rangeLength="3"/>
            <GuessRow rangeStart="2" rangeLength="4"/>
            <GuessRow rangeStart="1" rangeLength="4"/>
            <GuessRow rangeStart="0" rangeLength="4"/>
            <GuessRow rangeStart="0" rangeLength="5"/>
            <GuessRow rangeStart="1" rangeLength="5"/>
            <GuessRow rangeStart="0" rangeLength="6"/>
        </div>
    );

}

export default GameBoard;