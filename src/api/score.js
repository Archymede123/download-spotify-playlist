

export function updateScore(answers, timeToGuess) {
    let lastAnswer = answers.slice(-1)[0]
    let score = lastAnswer.correct === true ? Math.floor((2 - (lastAnswer.timeSpent / timeToGuess)) * 100) : 0
    lastAnswer.score = score
    return answers
}


export function getTotalScore(answers) {
    let scores = answers.map(answer => answer.score)
    let totalScore = scores.reduce((a, b) => a + b)
    return totalScore
}

