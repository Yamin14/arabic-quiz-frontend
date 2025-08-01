import { Link, Navigate, useLocation } from "react-router"
import type { Question } from "../../types/Quiz";
import { useQuiz } from "../../context/QuizContext";
import Spinner from "../layout/Spinner";

const Result = () => {

    //props
    const { state } = useLocation();
    const { quizResult, fromSource } = state || {};
    const { score, questions } = quizResult;
    const { loading } = useQuiz();

    if (!fromSource) {
        return <Navigate to='/' replace />
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div id="resultPage" className="page">
            <div className="mt-4">
                <div className="score-display">
                    <h2 className="text-3xl font-bold">
                        <i className="fas fa-trophy"></i>{' '}
                        Quiz Complete!
                    </h2>
                    <p className="text-xl mt-2">
                        <i className="fas fa-star"></i>{' '}
                        Score: {score}/{questions.length}
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-3">
                        <i className="fas fa-clipboard-list"></i>{' '}
                        Review Your Answers
                    </h3>

                    {questions.map((question: Question, index: number) => {
                        return (
                            <div
                                key={index}
                                className={`result-item ${question.isCorrect ? 'result-correct' : 'result-incorrect'}`}>
                                <h4 className="font-bold mb-2">
                                    <i className={`fas fa-check-circle ${question.isCorrect ? 'success-green' : 'danger-red'}`}></i>{' '}
                                    <span className="arabic text-2xl">{question.text}</span>
                                </h4>
                                <p className="text-sm text-muted mb-1">Your Answer: <span className="arabic text-2xl">{question.yourAnswer}</span></p>
                                <p className="text-sm font-medium success-green">Correct Answer: <span className="arabic text-2xl">{question.correctAnswer}</span></p>
                            </div>);
                    })}

                    <div className="text-center">
                        <Link to='/' className="btn btn-success btn-md">
                            <i className="fas fa-paper-plane"></i>
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Result