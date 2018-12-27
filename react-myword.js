const fetchWordLists = () => {
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
                if (cell.type === 'u') return <UnusedCell key={index} />;
                else if (cell.type === 'g') return <GuessCell key={index} value={cell.value}/>; })
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
             tableModel: [[{type: 'g', value: null, start:true},{type: 'g', value: null, last:true},{type:'u'},{type:'u'},{type:'u'},{type:'u'}],
                          [{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null, last:true},{type:'u'},{type:'u'},{type:'u'}],
                          [{type:'u'},{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null, last:true},{type:'u'},{type:'u'}],
                          [{type:'u'},{type:'u'},{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null, last:true},{type:'u'}],
                          [{type:'u'},{type:'u'},{type:'u'},{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null, last:true}],
                          [{type:'u'},{type:'u'},{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null, last:true}],
                          [{type:'u'},{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null, last:true},{type:'u'}],
                          [{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null, last:true},{type:'u'},{type:'u'}],
                          [{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null, last:true},{type:'u'}],
                          [{type:'u'},{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null, last:true}],
                          [{type: 'g', value: null, start:true},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null},{type: 'g', value: null, last:true, complete:true}]]
    };

    computeNextLocation = (currentState) => {
        var nextCellIx, nextRowIx,
            currentCell = currentState.tableModel[currentState.activeRow][currentState.activeCell],
            completed = false;
        if (currentCell.complete) {
            completed = true;
            nextCellIx = currentState.activeCell;
            nextRowIx = currentState.activeRow;
        } else if (currentCell.last) {
            // move to next line and score
            nextRowIx = currentState.activeRow + 1;
            nextCellIx = _.findIndex(currentState.tableModel[nextRowIx], cell => cell.start);
        } else {
            nextCellIx = currentState.activeCell + 1;
            nextRowIx = currentState.activeRow;
        }

        return { activeRow: nextRowIx,
                 activeCell: nextCellIx,
                 "completed": completed };
    }

    handleEntry = (event) => {
        event.preventDefault();
        console.log('entered', event.key);
        // TODO: check for valid entries
        this.setState((currentState) => {
            // TODO: score when the row is full
            var newtable = _.cloneDeep(currentState.tableModel);
            newtable[currentState.activeRow][currentState.activeCell].value = event.key;
            return _.merge({tableModel: newtable}, this.computeNextLocation(currentState));
        });
    };


    render() {
        return (
            <GameTable model={this.state.tableModel} score={['','','','','','','','','','','']} />
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
