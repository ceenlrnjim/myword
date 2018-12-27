const UnusedCell = (props) => {
    return (
        <div className="cell unused"></div>
    );
}

const GuessCell = (props) => {
    return (
        <div className="cell letter"></div>
    );
};

const ScoreCell = (props) => {
    return (
        <div className="cell score"></div>
    );
};

const GuessRow = (props) => {
    return (
        <div className="row">
            { props.spec.map( (cell, index) => {
                if (cell === 'u') return <UnusedCell key={index} />;
                else if (cell === 'g') return <GuessCell key={index} />; })
            }
            <ScoreCell />
        </div>
    );
}

const GameTable = (props) => {
    return (
        <div className="table">
        {console.log(props.structure) }
            { props.structure.map( (row, index) => <GuessRow key={index} spec={row} /> ) }
        </div>
    );
}

class MyWordApp extends React.Component {
    tableStructure = [['g','g','u','u','u','u'],
                      ['g','g','g','u','u','u'],
                      ['u','g','g','g','u','u'],
                      ['u','u','g','g','g','u'],
                      ['u','u','u','g','g','g'],
                      ['u','u','g','g','g','g'],
                      ['u','g','g','g','g','u'],
                      ['g','g','g','g','u','u'],
                      ['g','g','g','g','g','u'],
                      ['u','g','g','g','g','g'],
                      ['g','g','g','g','g','g']];

    state = { activeRow: 0,
              activeCell: 0,
              targetWord: 'grapes' };


    render() {
        return (
            <GameTable structure={this.tableStructure} />
        );
    }
}

ReactDOM.render(<MyWordApp />, document.querySelector('#main-container'));
