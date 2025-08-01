import { useEffect, useState } from "react"
import api from "../../api/api"
import { useAuth } from "../../context/AuthContext"
import Spinner from "../layout/Spinner";

const ViewQuestions = () => {

    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>();
    const [questions, setQuestions] = useState<{
        _id: string,
        text: string,
        options: [{
            text: string,
            isCorrect: boolean
        }],
        level: number,
        category: string
    }[]>();

    //fetch questions
    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await api.get('/api/questions', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setQuestions(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchQuestions();
    }, [])

    //delete question
    const deleteQuestion = async (id: string) => {
        setLoading(true);
        try {
            const response = await api.delete(`/api/questions/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const updatedQuestions = (questions ?? []).filter(q => q._id != id);
                setQuestions(updatedQuestions);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //return
    if (loading) {
        return <Spinner />
    }

    return (
        <div id="viewQuestionsPage" className="page">
            <div className="mt-4">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-xl font-bold">
                            <i className="fas fa-list"></i>
                            All Questions
                        </h2>
                        <button className="btn btn-primary btn-sm">
                            <i className="fas fa-plus"></i>
                            Add New Question
                        </button>
                    </div>
                    <div className="card-body">
                        {questions && questions.map((question, index) => {
                            return (
                                <div className="question-card" key={index}>
                                    <div className="question-header">
                                        <div>
                                            <span className="text-sm text-muted">
                                                <i className="fas fa-tags"></i>
                                                {question.category} • Level {question.level}
                                            </span>
                                        </div>
                                        <div className="question-actions">
                                            <button className="btn btn-primary btn-sm">
                                                <i className="fas fa-edit"></i>
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => deleteQuestion(question._id)}
                                                className="btn btn-danger btn-sm">
                                                <i className="fas fa-trash"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="question-content">
                                        <div className="question-title">
                                            <i className="fas fa-question-circle"></i>
                                            {question.text}
                                        </div>
                                        <div className="options-grid">
                                            {question.options.map((option, i) => {
                                                return (
                                                    <div
                                                        className={`option-display ${option.isCorrect && 'correct'}`}
                                                        key={i}>
                                                        <i className="far fa-circle"></i>
                                                        {option.text}
                                                    </div>)
                                            })}
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewQuestions