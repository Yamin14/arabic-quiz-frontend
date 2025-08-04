import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { NotFound } from "../layout/NotFound";
import Spinner from "../layout/Spinner";
import { useEffect, useState } from "react";
import api from "../../api/api";

const AddQuestion = () => {
    const { token } = useAuth();
    const nav = useNavigate();

    //state
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState<{
        text: string,
        options: { text: string, isCorrect: boolean }[],
        category: string,
        level: number
    }>({
        text: '',
        options: [{text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}],
        category: 'Vocabulary',
        level: 1
    });

    useEffect(() => console.log(question), [question])

    //handle text and level change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuestion((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                [name]: name === 'level' ? parseInt(value) : value
            };
        });
    }

    //handle select change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuestion((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                [name]: value
            };
        });
    }

    //handle options change
    const handleOptionsChange = (index: number, field: 'text' | 'isCorrect', value: string | boolean) => {
        if (!question) return;
        const updatedOptions = [...question.options];
        updatedOptions[index] = {
            ...updatedOptions[index],
            [field]: value
        }
        if (field === 'isCorrect') {
            updatedOptions.map((option, i) => {
                if (i !== index) {
                    option.isCorrect = false;
                }
            })
        }

        setQuestion((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                options: updatedOptions
            }
        })
    }

    //handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post(`/api/questions`, question, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            nav('/admin/questions');
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

    if (!question) {
        return <NotFound />
    }

    return (
        <div id="addQuestionPage" className="page">
            <div className="form-container">
                <h2 className="text-2xl font-bold text-center mb-4">
                    <i className="fas fa-plus-circle"></i>
                    Add New Question
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Question Text */}
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-question-circle"></i>
                            Question Text
                        </label>
                        <input type="text" onChange={handleInputChange} className="input arabic" value={question.text} name="text" />
                    </div>

                    {/* Options */}
                    {question.options.map((option, index) => {
                        return (
                            <div className="form-group" key={index}>
                                <label className="label">
                                    <i className="fas fa-list"></i>
                                    Option {index + 1}
                                </label>
                                <input type="text" className="input arabic" value={option.text} onChange={(e) => handleOptionsChange(index, 'text', e.target.value)} />

                                <input type="radio" className="radio" value='Is Correct' checked={option.isCorrect} onChange={(e) => handleOptionsChange(index, 'isCorrect', e.target.checked)} />
                                <label className="text-sm"> Is Correct</label>
                            </div>
                        )
                    })}

                    {/* Category */}
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-tags"></i>
                            Category
                        </label>
                        <select defaultValue={question.category} onChange={handleSelectChange} name="category" className="select">
                            <option value="Vocabulary">Vocabulary</option>
                            <option value="Grammar">Grammar</option>
                        </select>
                    </div>

                    {/* Level */}
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-layer-group"></i>
                            Level
                        </label>
                        <input type="number" onChange={handleInputChange} className="input" value={question.level} name='level' />
                    </div>

                    <div className="flex justify-between">
                        <Link to='/admin/questions' type="button" className="btn btn-outline">
                            <i className="fas fa-times"></i>
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-save"></i>
                            Add Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddQuestion