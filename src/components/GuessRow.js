import BackgroundCell from "./BackgroundCell";
import GuessCell from "./GuessCell";

function GuessRow(props) {
    const cells = [];
    const start = +props.rangeStart;
    const len = +props.rangeLength;
    var i,j;

    for (i=0;i<start;i++) {
        cells[i] = <BackgroundCell key={i}/>;
    }

    for (i=start,j=0;i<start + len;i++,j++) { 
        cells[i] = <GuessCell key={i} value={props.guess && props.guess.length >= j ? props.guess[j] : '' }/>;
    }

    for (i= +props.rangeStart + +props.rangeLength;i<6;i++) {
        cells[i] = <BackgroundCell key={i}/>;
    }
    return (
        <div className="board__row">
            <div className="board__row_cells">
                {cells}
            </div>
            <div className="board__row_score">{props.score}</div>
        </div>
    );
}

export default GuessRow;