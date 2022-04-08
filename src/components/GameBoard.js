import GuessRow from "./GuessRow";
import {useSelector} from "react-redux";
import {rowConfig} from "../StateLogic";

function buildRowMap(state) {
    return [0,1,2,3,4,5,6,7,8,9,10].map(i => ({
        start: rowConfig['row' + i].start,
        length: rowConfig['row' + i].length,
        value: state['row' + i],
        score: state['row' + i + 'score']
    }));
}

function GameBoard(props) {
    const rows = useSelector(state => buildRowMap(state))
                   .map((rowObj,k) => 
                    <GuessRow key={k}
                        rangeStart={rowObj.start} 
                        rangeLength={rowObj.length}
                        guess={rowObj.value}
                        score={rowObj.score}/>
                   );
    
    return ( 
        <div className="board">
            {rows}   
        </div>
    );

}

export default GameBoard;