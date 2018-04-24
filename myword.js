//(function() {
    var sixWords, sevenWords;
    var round = 0;
    var guessCount = 0;
    var totalScore = 0;
    var currentWord;
    var roundGuesses = [[[0,2],[0,3],[1,3],[2,3],[3,3],[2,4],[1,4],[0,4],[0,5],[1,5],[0,6]],
                        [[0,3],[0,4],[1,4],[2,4],[3,4],[2,5],[1,5],[0,5],[0,6],[1,6],[0,7]]];

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

        var p2 = new Promise(function(resolve, reject) {
            var x2 = new XMLHttpRequest();
            x2.addEventListener('load', function () {
                sevenWords = eval(x2.responseText);
                resolve();
            });
            x2.open('GET', 'sevens.json');
            x2.overrideMimeType('application/json');
            x2.send();
        });

        return Promise.all([p,p2]);
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

    function guess(round, guessNumber, guess, target) {
        return score(target, guess, roundGuesses[round][guessNumber][0], roundGuesses[round][guessNumber][1]);
    }

    function positionGuessBox(roundNumber, guessNumber, length) {
        var old = document.querySelector('#guessContainer');
        var row = document.getElementById('round'+roundNumber+'row'+guessNumber);
        var d = document.createElement('div');
        if (old) { old.remove(); }
        d.innerHTML = '<input type="text" id="guessInput" maxLength="'+length+'"><button onclick="submitGuess()">Guess</button>';
        d.id = 'guessContainer';
        d.className = "cell guess";
        row.appendChild(d);
        document.querySelector('#guessContainer input').focus();
    }

    function pickWord(words) {
        var index = Math.floor(Math.random() * (words.length)); 
        currentWord = words[index].toLowerCase();
    }

    // TODO: add reset button to play again
    // TODO: clean up with end of round 1 logic
    function reset() {
        pickWord(sixWords);
        round = 0;
        guessCount = 0;
        totalScore = 0;
        positionGuessBox(0,0,2);
    }


    // TODO: change to display all the squares and fill them in
    function addToHistory(guess, score, start, length) {
        /*
        var n = document.getElementById('historyDisplay');
        var d = document.createElement('div');
        var contents = '<div class="row">';
        for (var i=0;i<start;i++) {
            contents += '<div class="cell unused"></div>';
        }
        for (var i=start;i<start+length;i++) {
            contents += '<div class="cell">' + guess.charAt(i-start) + '</div>';
        }
        for (var i=start+length;i<currentWord.length;i++) {
            contents += '<div class="cell unused"></div>';
        }

        contents += '<div class="cell score">' + score + '</div>';
        contents += '</div>';
        d.innerHTML = contents;
        n.appendChild(d);
        */

        var rowId = '#round' + round + 'row' + guessCount;
        var letterSlots = document.querySelectorAll(rowId + ' div.letter');
        letterSlots.forEach(function (element,ix) {
            element.innerHTML = guess.charAt(ix);
        });

        document.querySelector(rowId + ' div.score').innerHTML = score;
    }

    function submitGuess() {
        var guessInput = document.getElementById('guessInput');
        var g = guessInput.value.toLowerCase();
        var scoreDisplay = document.getElementById('scoreDisplay');

        //console.log('guessing', round, guessCount, g, currentWord);
        var score = guess(round, guessCount, g, currentWord);
        var roundDetails = roundGuesses[round][guessCount];
        addToHistory(g, score, roundDetails[0], roundDetails[1]);
        totalScore += score;
        guessCount += 1;

        // display score
        scoreDisplay.innerText = 'Total: ' + totalScore;
        //guessInput.value = '';

        // detect end of round
        if (guessCount === roundGuesses[round].length) {
           scoreDisplay.innerText += ' - word was ' + currentWord;
           guessCount = 0;
           totalScore = 0;
           round = 1;
           pickWord(sevenWords);
           positionGuessBox(round, guessCount, roundGuesses[round][guessCount][1]);
        }
        else {
            positionGuessBox(round, guessCount, roundGuesses[round][guessCount][1]);
        }
    }

    // initialize everything
    fetchWordLists().then(reset);
//})();
