import { useEffect, useState } from "react";
import { useQuiz } from "../../context/QuizContext"
import Spinner from "../layout/Spinner";
import { useNavigate } from "react-router";
import { NotFound } from "../layout/NotFound";
import { useAuth } from "../../context/AuthContext";
import type { QuizResult } from "../../types/Quiz";

const Quiz = () => {

    const { quiz, loading: quizLoading, fetchQuiz, submitQuiz } = useQuiz();
    const { user, loading: userLoading } = useAuth();
    const [index, setIndex] = useState(0);
    const [checked, setChecked] = useState(false);
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [correctIndex, setCorrectIndex] = useState<number | null>(null);

    const nav = useNavigate();

    //quiz result
    const [quizResult, setQuizResult] = useState<QuizResult>({score: 0, questions: []});

    //fetch quiz
    useEffect(() => {
        fetchQuiz(user?.level ?? 1);
    }, []);

    //timer
    const [timer, setTimer] = useState(180);

    useEffect(() => {
        if (timer <= 0) {
            setIndex(index + 1);
            setChecked(false);
            setIsCorrect(false);
            setSelectedIndex(null);
            setIndex(0);
            //submit
            submitQuiz(score)
                .then(() => {
                    nav('/quiz/result', { state: { quizResult, fromSource: true } });
                });
        };

        const timerId = setTimeout(() => {
            setTimer(timer - 1);
        }, 1000)
        return () => clearInterval(timerId);
    }, [timer])

    //format time
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    //get class
    const getClass = (i: Number) => {
        const optionClass = 'option-btn';
        if (checked) {
            if (selectedIndex === i) {
                return isCorrect ? 'correct ' + optionClass : 'incorrect ' + optionClass;
            } else {
                return i === correctIndex ? 'correct ' + optionClass : optionClass;
            }
        } else {
            return selectedIndex === i ? 'selected ' + optionClass : optionClass;
        }
    }

    //check answer
    const checkAnswer = () => {
        const correctOptionIndex = quiz[index].options.findIndex(o => o.isCorrect);
        setCorrectIndex(correctOptionIndex);
        let temp = false; //is correct or not
        let tempScore = score;

        //check if correct
        if (selectedIndex === correctOptionIndex) {
            setScore(score + 1);
            tempScore += 1;
            setIsCorrect(true);
            temp = true;
        } else {
            setIsCorrect(false);
            temp = false;
        }

        //update quiz result
        setQuizResult({
            score: tempScore,
            questions: [...quizResult.questions, {
                text: quiz[index].text,
                yourAnswer: selectedIndex !== null ? quiz[index].options[selectedIndex].text : '',
                correctAnswer: quiz[index].options[correctOptionIndex].text,
                isCorrect: temp
            }]
        })

        setChecked(true);
    }

    //next question
    const nextQuestion = () => {
        setIndex(index + 1);
        setChecked(false);
        setIsCorrect(false);
        setSelectedIndex(null);
        if (index === quiz.length - 1) {
            setIndex(0);
            //submit
            submitQuiz(score)
                .then(() => {
                    nav('/quiz/result', { state: { quizResult, fromSource: true } });
                });
        }
    }

    //return
    if (userLoading || quizLoading) {
        return <Spinner />
    }

    if (quiz.length === 0) {
        return <NotFound />
    }

    return (
        <div className="page">
            <div className="mt-4">
                <div className="quiz-header">
                    <h2 className="text-2xl font-bold">
                        <i className="fas fa-question-circle"></i>{' '}
                        Arabic Quiz
                    </h2>
                    <p className="text-lg">
                        <i className="fas fa-layer-group"></i>{' '}
                        Level: {user?.level}
                    </p>
                    <p className="text-2xl">
                        <i className="fas fa-time"></i>{' '}
                        Time Left : {`0${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
                    </p>
                </div>

                <div className="question-container">
                    <div className="question-text">
                        <i className="fas fa-comment-alt"></i>{' '}
                        <span className="arabic text-3xl">{quiz[index].text}</span>
                    </div>

                    <ul className="options-list">
                        {quiz[index].options.map((option, i) => {
                            return (
                                <li key={i}
                                    className='option-item'>
                                    <button
                                        className={getClass(i)}
                                        onClick={() => setSelectedIndex(i)}
                                        disabled={checked}>
                                        <i className="far fa-circle"></i>{' '}
                                        <span className="arabic text-3xl">{option.text}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="text-center">
                        {checked
                            ? <button className="btn btn-primary" onClick={nextQuestion}>
                                <i className={`fas ${index === quiz.length - 1 && 'fa-paper-plane'}`}></i>
                                {index === quiz.length - 1 ? 'Submit Quiz' : 'Next Question'}
                            </button>

                            : <button 
                                className="btn btn-primary"
                                disabled={selectedIndex === null}
                                onClick={checkAnswer}>
                                <i className="fas fa-check"></i>
                                Check Answer
                            </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz