import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from './AuthContext';

interface Props {
    children: React.ReactNode;
}

interface Option {
    text: string;
    isCorrect: boolean;
}

interface Question {
    _id: string;
    text: string;
    category: string;
    level: number;
    options: Option[];
}

//context
const QuizContext = createContext<{
    quiz: Question[],
    loading: boolean,
    fetchQuiz: (level: number, category: string) => void,
    submitQuiz: (score: number) => Promise<boolean | undefined>;
} | undefined>(undefined);

//quiz provider
export const QuizProvider = ({ children }: Props) => {

    const [loading, setLoading] = useState(true);
    const [quiz, setQuiz] = useState([]);
    const { token } = useAuth();

    //fetch quiz
    const fetchQuiz = async (level: number, category: string) => {
        try {
            setLoading(true);
            const response = await api.get(`/api/quiz?level=${level}&category=${category}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setQuiz(response.data);
            } else {
                setQuiz([]);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setQuiz([]);
        } finally {
            setLoading(false);
        }
    }

    //submit quiz
    const submitQuiz = async (score: number) => {
        try {
            setLoading(true);
            const response = await api.put(`/api/quiz/submit`, {score}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setQuiz([]);
            setLoading(false);
        }
    }

    return (
        <QuizContext.Provider value={{ quiz, loading, fetchQuiz, submitQuiz }}>
            {children}
        </QuizContext.Provider>
    )
};

export const useQuiz = () => {
    const context = useContext(QuizContext);

    if (!context) {
        throw new Error('useQUiz must be used within an QuizProvider');
    }

    const { quiz, loading, fetchQuiz, submitQuiz } = context;
    return { quiz, loading, fetchQuiz, submitQuiz };
};