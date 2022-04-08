import GuessRow from "./GuessRow";
import {useSelector} from "react-redux";

function GameBoard(props) {
    const rows = useSelector(state => state.get('rows'))
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