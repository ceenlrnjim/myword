import GuessCell from "./GuessCell";

function GuessRow(props) {
    return (
        <div className="board__row">
            <div className="board__row_cells">
                <GuessCell index="0" rangeStart={props.rangeStart} rangeLength={props.rangeLength}></GuessCell>
                <GuessCell index="1" rangeStart={props.rangeStart} rangeLength={props.rangeLength}></GuessCell>
                <GuessCell index="2" rangeStart={props.rangeStart} rangeLength={props.rangeLength}></GuessCell>
                <GuessCell index="3" rangeStart={props.rangeStart} rangeLength={props.rangeLength}></GuessCell>
                <GuessCell index="4" rangeStart={props.rangeStart} rangeLength={props.rangeLength}></GuessCell>
                <GuessCell index="5" rangeStart={props.rangeStart} rangeLength={props.rangeLength}></GuessCell>
            </div>
            <div className="board__row_score"></div>
        </div>
    );
}

export default GuessRow;