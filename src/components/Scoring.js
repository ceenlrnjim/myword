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

    return score;
}

export default score;