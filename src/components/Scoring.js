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

    console.log("score/score2", score, score2(target,guess,start,len));
    return score;
}

function score2(target, guess, start, len) {
    const targetSection = target.substring(start,len).split('');
    const matchScore = targetSection.reduce(
        ({rt, rg, score},tl,i) => tl === guess[i] ? 
            {score: score + 100, rt: rt, rg: rg} : 
            {score:score, rt: rt.concat(tl), rg: rg.concat(guess[i])}, 
        {score:0, rt:[], rg: []});
    const {rt, rg} = matchScore;

    const containsScore = rt.reduce(
        ({r,score},tl,i) => r.includes(tl) ? 
            {score:score+25, r: r.filter((e,i) => i !== r.indexOf(tl))} : 
            {score:score, r:r}
        , {r: rg, score: 0});

    console.log(containsScore.score, matchScore.score);
    return matchScore.score + containsScore.score;
}

export default score;