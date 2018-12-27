// TODO: cleanup this mess of grabbing values
// - maybe keep the values at the row?  then send them down to the cell?
// - maybe rows should be stateful?
function getRowStartIndex(row) {
    return _.findIndex(row, cell => cell.start);
}

function getCurrentStartIndex(state) {
    return getRowStartIndex(state.tableModel[state.activeRow]);
}

function getCurrentGuessLength(state) {
    var row = state.tableModel[state.activeRow];
    return _.findIndex(row, cell => cell.last) + 1 - (getRowStartIndex(row));
}

function getGuess(state, nextTable) {
    var guess = '';
    var startIx = getCurrentStartIndex(state);
    var rowToScore = nextTable[state.activeRow];
    guess = _.filter(rowToScore, cell => cell.value !== undefined).reduce((a,v) => a + v.value, '');
    return guess;
}

function score(target, guess, start, len) {
    var targetMatch = '';
    var guessMatch = '';
    var next, score = 0;

    for (var i=0;i<target.length;i++) {
        if (i < start || i >= start + len) {
            targetMatch += target.charAt(i);
        } else if (i < start + len) {
            if (target.charAt(i) === guess.charAt(i-start)) {
                targetMatch += '=';
                guessMatch += '=';
                score += 100;
            } else {
                targetMatch += target.charAt(i);
                guessMatch += guess.charAt(i-start);
            }
        }
    }

    for (var i=0;i<guessMatch.length;i++) {
        next = guessMatch.charAt(i);
        if (next !== '=' && next !== '~') {
            targetMatch = targetMatch.replace(next,'~');
        }
    }

    for (var i=0;i<targetMatch.length;i++) {
        score += targetMatch.charAt(i) === '~' ? 25 : 0;
    }

    return score;
}

function fetchWordLists() {
    var self = this;
    var p = new Promise(function(resolve, reject) {
        var x1 = new XMLHttpRequest();
        x1.addEventListener('load', function () {
            sixWords = eval(x1.responseText);
            resolve();
        });
        x1.open('GET', 'sixes.json');
        x1.overrideMimeType('application/json');
        x1.send();
    });

    return p;
}

const pickWord = (words) => words[Math.floor(Math.random() * (words.length))].toLowerCase();

const UnusedCell = (props) => {
    return (
        <div className="cell unused"></div>
    );
}

const GuessCell = (props) => {
    return (
        <div className="cell letter">{props.value}</div>
    );
};

const ScoreCell = (props) => {
    return (
        <div className="cell score">{props.score}</div>
    );
};

const GuessRow = (props) => {
    return (
        <div className="row">
            { props.spec.map( (cell, index) => {
                if (cell.value === undefined) return <UnusedCell key={index} />;
                else return <GuessCell key={index} value={cell.value}/>; })
            }
            <ScoreCell score={props.score} />
        </div>
    );
}



const GameTable = (props) => {
    return (
        <div className="table">
        {console.log(props.model) }
            { props.model.map( (row, index) => <GuessRow key={index} spec={row} score={props.score[index]} /> ) }
        </div>
    );
}

class MyWordApp extends React.Component {

    state = { activeRow: 0,
              activeCell: 0,
              completed: false,
              targetWord: 'grapes', // TODO: initialize with random choice
              score: [null,null, null, null, null, null, null, null, null, null, null],
             tableModel: [[{value: null, start:true},{value: null, last:true},{},{},{},{}],
                          [{value: null, start:true},{value: null},{value: null, last:true},{},{},{}],
                          [{},{value: null, start:true},{value: null},{value: null, last:true},{},{}],
                          [{},{},{value: null, start:true},{value: null},{value: null, last:true},{}],
                          [{},{},{},{value: null, start:true},{value: null},{value: null, last:true}],
                          [{},{},{value: null, start:true},{value: null},{value: null},{value: null, last:true}],
                          [{},{value: null, start:true},{value: null},{value: null},{value: null, last:true},{}],
                          [{value: null, start:true},{value: null},{value: null},{value: null, last:true},{},{}],
                          [{value: null, start:true},{value: null},{value: null},{value: null},{value: null, last:true},{}],
                          [{},{value: null, start:true},{value: null},{value: null},{value: null},{value: null, last:true}],
                          [{value: null, start:true},{value: null},{value: null},{value: null},{value: null},{value: null, last:true, complete:true}]]
    };

    computeNextLocation = (currentState, nextTable) => {
        var nextCellIx, nextRowIx,
            currentCell = currentState.tableModel[currentState.activeRow][currentState.activeCell],
            completed = false,
            nextScore = _.cloneDeep(currentState.score);

        if (currentCell.complete) {
            completed = true;
            nextCellIx = currentState.activeCell;
            nextRowIx = currentState.activeRow;
        } else if (currentCell.last) {
            // move to next line and score
            nextRowIx = currentState.activeRow + 1;
            nextCellIx = getRowStartIndex(currentState.tableModel[nextRowIx]); 
            nextScore[currentState.activeRow] = score(currentState.targetWord, getGuess(currentState, nextTable), getCurrentStartIndex(currentState), getCurrentGuessLength(currentState));
            
        } else {
            nextCellIx = currentState.activeCell + 1;
            nextRowIx = currentState.activeRow;
        }

        return { activeRow: nextRowIx,
                 activeCell: nextCellIx,
                 completed: completed,
                 score: nextScore};
    }

    handleEntry = (event) => {
        event.preventDefault();
        console.log('entered', event.key);
        // TODO: check for valid entries
        // TODO: backspace to clear an error within a row
        this.setState((currentState) => {
            // TODO: score when the row is full
            var newtable = _.cloneDeep(currentState.tableModel);
            newtable[currentState.activeRow][currentState.activeCell].value = event.key;
            return _.merge({tableModel: newtable}, this.computeNextLocation(currentState, newtable));
        });
    };


    render() {
        return (
            <GameTable model={this.state.tableModel} score={this.state.score} />
        );
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleEntry);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEntry);
    }
}

ReactDOM.render(<MyWordApp />, document.querySelector('#main-container'));
