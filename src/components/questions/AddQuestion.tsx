
const AddQuestion = () => {
    return (
        <div id="addQuestionPage" className="page">
            <div className="form-container">
                <h2 className="text-2xl font-bold text-center mb-4">
                    <i className="fas fa-plus-circle"></i>
                    Add New Question
                </h2>
                <form>
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-question-circle"></i>
                            Question Text
                        </label>
                        <textarea id="questionText" className="textarea" placeholder="Enter the question text in Arabic/Urdu"></textarea>
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-list"></i>
                            Option 1
                        </label>
                        <input type="text" id="option1" className="input" placeholder="Enter first option" />
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-list"></i>
                            Option 2
                        </label>
                        <input type="text" id="option2" className="input" placeholder="Enter second option" />
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-list"></i>
                            Option 3
                        </label>
                        <input type="text" id="option3" className="input" placeholder="Enter third option" />
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-list"></i>
                            Option 4
                        </label>
                        <input type="text" id="option4" className="input" placeholder="Enter fourth option" />
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-check-circle"></i>
                            Correct Answer
                        </label>
                        <select id="correctAnswer" className="select">
                            <option value="">Select the correct answer</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-tags"></i>
                            Category
                        </label>
                        <select id="category" className="select">
                            <option value="">Select category</option>
                            <option value="vocabulary">Vocabulary</option>
                            <option value="grammar">Grammar</option>
                            <option value="reading">Reading</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-layer-group"></i>
                            Level
                        </label>
                        <select id="level" className="select">
                            <option value="">Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button type="button" className="btn btn-outline">
                            <i className="fas fa-times"></i>
                            Cancel
                        </button>
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