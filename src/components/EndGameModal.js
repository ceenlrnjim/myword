function EndGameModal(props) {

    return (
        <div className="end_game_modal_backdrop">
            <div className="end_game_modal">
                <h2>The word was</h2>
                <h2>{props.answer}</h2> 
                <h2>You scored {props.score}!</h2>
            </div>
        </div>
    );

}

export default EndGameModal;