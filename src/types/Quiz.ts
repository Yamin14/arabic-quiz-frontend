export interface Question {
    text: string,
    yourAnswer: string,
    correctAnswer: string,
    isCorrect: boolean
}

export interface QuizResult {
    score: Number,
    questions: Question[]
}