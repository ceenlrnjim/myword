function score(target, guess, start, len) {
    var targetMatch = '';
    var guessMatch = '';
    var next, score=0, i = 0;

    for (i=0;i<target.length;i++) {
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

    for (i=0;i<guessMatch.length;i++) {
        next = guessMatch.charAt(i);
        if (next !== '=' && next !== '~') {
            targetMatch = targetMatch.replace(next,'~');
        }
    }

    for (i=0;i<targetMatch.length;i++) {
        score += targetMatch.charAt(i) === '~' ? 25 : 0;
    }

    console.log("score comparison: ", score, score2(target, guess, start, len));

    return score;
}

function dropFirst(arr, val) {
    const index = arr.findIndex(v => v===val);
    if (index >= 0) {
        arr.splice(index,1)
    }
    return arr;
}

function score2(target, guess, start, len) {
    // TODO: need the other letters that aren't in the guess range as they can match for inexact points
    const unmatchedLetters = guess.split('').filter((l,ix) => l !== target[ix + start]);
    const exactMatchScore = (len - unmatchedLetters.length)*100;
    const {score} = unmatchedLetters.reduce(({score, remaining},v) => {
        return {score: score + (remaining.includes(v) ? 25: 0),
                remaining: dropFirst(remaining, v)};
    }, {score:0, remaining: guess.split('')})

    return exactMatchScore + score;
}

export default score;