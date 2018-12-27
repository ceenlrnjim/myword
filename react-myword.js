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
    // classify values based on my row configuration
    var values = [], outofbounds, invalue;
    for (var i=0;i<props.spec.totalLength;i++) {
        // is this an unused cell?  I.E. The index is before or after the guess region
        outofbounds = i < props.spec.startIx || i >= props.spec.startIx + props.spec.guessLength;
        // if in the bounds of the guess, does that guess have a value yet?
        invalue = props.spec.value && (i-props.spec.startIx) < props.spec.value.length

        values.push(outofbounds ? undefined :
                        invalue ? props.spec.value.charAt(i - props.spec.startIx) : null);
    }

    return (
        <div className="row">
            { values.map( (value, index) => {
                if (value === undefined) return <UnusedCell key={index} />;
                else return <GuessCell key={index} value={value} />; })
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
              completed: false,
              targetWord: 'grapes', // TODO: initialize with random choice
              score: [null,null, null, null, null, null, null, null, null, null, null],
              tableModel: [{value: null, startIx: 0, guessLength: 2, totalLength:6},
                           {value: null, startIx: 0, guessLength: 3, totalLength:6},
                           {value: null, startIx: 1, guessLength: 3, totalLength:6},
                           {value: null, startIx: 2, guessLength: 3, totalLength:6},
                           {value: null, startIx: 3, guessLength: 3, totalLength:6},
                           {value: null, startIx: 2, guessLength: 4, totalLength:6},
                           {value: null, startIx: 1, guessLength: 4, totalLength:6},
                           {value: null, startIx: 0, guessLength: 4, totalLength:6},
                           {value: null, startIx: 0, guessLength: 5, totalLength:6},
                           {value: null, startIx: 1, guessLength: 5, totalLength:6},
                           {value: null, startIx: 0, guessLength: 6, totalLength:6}]
    };

    computeNextLocation = (currentState, currentGuess) => {

        var nextScore = _.cloneDeep(currentState.score),
            currentRow = currentState.tableModel[currentState.activeRow],
            isRowComplete = currentGuess && currentGuess.length === currentRow.guessLength,
            isGameComplete = isRowComplete && currentState.activeRow === currentState.tableModel.length - 1,
            nextRowIx = isRowComplete && !isGameComplete ? currentState.activeRow + 1 : currentState.activeRow;

        if (isRowComplete) {
            // whether the end of the game or not
            nextScore[currentState.activeRow] = score(currentState.targetWord, currentGuess, currentRow.startIx, currentRow.guessLength);
        }

        return { activeRow: nextRowIx,
                 completed: isGameComplete,
                 score: nextScore};
    }

    handleEntry = (event) => {
        event.preventDefault();
        console.log('entered', event.key);
        // TODO: check for valid entries

        // TODO: backspace to clear an error within a row
        this.setState((currentState) => {
            var newTable = _.cloneDeep(currentState.tableModel),
                row = newTable[currentState.activeRow],
                newValue = row.value === null ? event.key : row.value + event.key;

            newTable[currentState.activeRow].value = newValue;
            return _.merge({tableModel: newTable}, this.computeNextLocation(currentState, newValue));
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
