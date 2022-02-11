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
            resolve(eval(x1.responseText));
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
            { props.model.map( (row, index) => <GuessRow key={index} spec={row} score={props.score[index]} /> ) }
        </div>
    );
}

const Letter = (props) => {
    const handler = () => { props.onSelect(props.value) };
    return (
        <li className="keyletter" 
             onClick={handler} 
             onTouch={handler}>
            {props.value}
        </li>
    );
}

class LetterSelector extends React.Component {
    handleSelect = value => {
        this.props.onSelect({key:value});
    };

    render() {
        return (
                <div>
            <ul className="keyboard">
                <li className="keyletter" onClick={() => this.handleSelect('q')} onTouch={() => this.handleSelect('q')}>q</li>
                <li className="keyletter" onClick={() => this.handleSelect('w')} onTouch={() => this.handleSelect('w')}>w</li>
                <li className="keyletter" onClick={() => this.handleSelect('e')} onTouch={() => this.handleSelect('e')}>e</li>
                <li className="keyletter" onClick={() => this.handleSelect('r')} onTouch={() => this.handleSelect('r')}>r</li>
                <li className="keyletter" onClick={() => this.handleSelect('t')} onTouch={() => this.handleSelect('t')}>t</li>
                <li className="keyletter" onClick={() => this.handleSelect('y')} onTouch={() => this.handleSelect('y')}>y</li>
                <li className="keyletter" onClick={() => this.handleSelect('u')} onTouch={() => this.handleSelect('u')}>u</li>
                <li className="keyletter" onClick={() => this.handleSelect('i')} onTouch={() => this.handleSelect('i')}>i</li>
                <li className="keyletter" onClick={() => this.handleSelect('o')} onTouch={() => this.handleSelect('o')}>o</li>
                <li className="keyletter" onClick={() => this.handleSelect('p')} onTouch={() => this.handleSelect('p')}>p</li>
            </ul>
            <ul className="keyboard">
                <li className="keyletter" onClick={() => this.handleSelect('a')} onTouch={() => this.handleSelect('a')}>a</li>
                <li className="keyletter" onClick={() => this.handleSelect('s')} onTouch={() => this.handleSelect('s')}>s</li>
                <li className="keyletter" onClick={() => this.handleSelect('d')} onTouch={() => this.handleSelect('d')}>d</li>
                <li className="keyletter" onClick={() => this.handleSelect('f')} onTouch={() => this.handleSelect('f')}>f</li>
                <li className="keyletter" onClick={() => this.handleSelect('g')} onTouch={() => this.handleSelect('g')}>g</li>
                <li className="keyletter" onClick={() => this.handleSelect('h')} onTouch={() => this.handleSelect('h')}>h</li>
                <li className="keyletter" onClick={() => this.handleSelect('j')} onTouch={() => this.handleSelect('j')}>j</li>
                <li className="keyletter" onClick={() => this.handleSelect('k')} onTouch={() => this.handleSelect('k')}>k</li>
                <li className="keyletter" onClick={() => this.handleSelect('l')} onTouch={() => this.handleSelect('l')}>l</li>
            </ul>
            <ul className="keyboard">
                <li className="keyletter" onClick={() => this.handleSelect('Del')} onTouch={() => this.handleSelect('Del')}>Del</li>
                <li className="keyletter" onClick={() => this.handleSelect('z')} onTouch={() => this.handleSelect('z')}>z</li>
                <li className="keyletter" onClick={() => this.handleSelect('x')} onTouch={() => this.handleSelect('x')}>x</li>
                <li className="keyletter" onClick={() => this.handleSelect('c')} onTouch={() => this.handleSelect('c')}>c</li>
                <li className="keyletter" onClick={() => this.handleSelect('v')} onTouch={() => this.handleSelect('v')}>v</li>
                <li className="keyletter" onClick={() => this.handleSelect('b')} onTouch={() => this.handleSelect('b')}>b</li>
                <li className="keyletter" onClick={() => this.handleSelect('n')} onTouch={() => this.handleSelect('n')}>n</li>
                <li className="keyletter" onClick={() => this.handleSelect('m')} onTouch={() => this.handleSelect('m')}>m</li>
                <li className="keyletter" onClick={() => this.handleSelect('Go')} onTouch={() => this.handleSelect('Go')}>Go</li>
            </ul>
            </div>
       );
    }
}

const FinalAnswerDisplay = (props) => {
    if (props.completed) {
        return (
            <div className="theAnswer">The Answer Was: {props.targetWord} </div>
        );
    } else {
        return (
            <div> </div>
        );
    }
};

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
    };

    scoreCurrentRow = () => {
        this.setState(currentState => {
            var nextScore = _.cloneDeep(currentState.score),
                currentRow = currentState.tableModel[currentState.activeRow],
                isGameComplete = currentState.activeRow === currentState.tableModel.length - 1,
                nextRowIx = !isGameComplete ? currentState.activeRow + 1 : currentState.activeRow;

            nextScore[currentState.activeRow] = score(currentState.targetWord, currentRow.value, currentRow.startIx, currentRow.guessLength);

            return {activeRow: nextRowIx, score: nextScore, completed: isGameComplete};
        });
    };

    isRowComplete = () => {
        var row = this.state.tableModel[this.state.activeRow];
        return row.value && row.value.length === row.guessLength;
    };

    isGameComplete = () => { return this.state.completed };

    handleBackspace = () => {
        this.setState((currentState) => {
            var row = currentState.tableModel[currentState.activeRow];
            if (row.value && row.value.length > 0) {
                return { tableModel: this.updateValueIn(currentState, row.value.substring(0, row.value.length - 1)) };
            }
        });
    };

    updateValueIn = (currentState, value) => {
        var newTable = _.cloneDeep(currentState.tableModel);
        newTable[currentState.activeRow].value = value;
        return newTable;
    };

    handleEntry = (event) => {
        if (event.key === 'Del' || event.key === 'Backspace') {
            this.handleBackspace();
        } else if (event.key === 'Go' || event.keyCode === 13) {
            if (this.isRowComplete()) {
                this.scoreCurrentRow();
            }
        } else if (!this.isRowComplete() && event.keyCode >= 65 && event.keyCode <= 122) {
            this.updateStateWithKey(event.key);
        }
    };

    updateStateWithKey = (key) => {
        this.setState((currentState) => {
            var row = currentState.tableModel[currentState.activeRow],
                newTable = this.updateValueIn(currentState, row.value === null ? key : row.value + key);

            return {tableModel: newTable};
        });
    };

    render() {
        return (
            <div className='mainArea'>
                <GameTable model={this.state.tableModel} score={this.state.score} />
                <FinalAnswerDisplay completed={this.state.completed} targetWord={this.state.targetWord}/>
                <LetterSelector onSelect={this.handleEntry} />
            </div>
        );
    }

    componentDidMount = () => {
        fetchWordLists().then(pickWord).then((word) => {
            this.setState(currentState => {
                return {targetWord: word};
            });
        });

        window.addEventListener('keydown', this.handleEntry);
    };
}

ReactDOM.render(<MyWordApp />, document.querySelector('#main-container'));

