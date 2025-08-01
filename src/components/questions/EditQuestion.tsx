
const EditQuestion = () => {
    return (
        <div id="editQuestionPage" className="page">
            <div className="form-container">
                <h2 className="text-2xl font-bold text-center mb-4">
                    <i className="fas fa-edit"></i>
                    Edit Question
                </h2>
                <form>
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-question-circle"></i>
                            Question Text
                        </label>
                        <textarea id="editQuestionText" className="textarea">ما معنى كلمة "كتاب"؟</textarea>
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-list"></i>
                            Option 1
                        </label>
                        <input type="text" id="editOption1" className="input" value="House" />
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-list"></i>
                            Option 2
                        </label>
                        <input type="text" id="editOption2" className="input" value="Book" />
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-list"></i>
                            Option 3
                        </label>
                        <input type="text" id="editOption3" className="input" value="Water" />
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-list"></i>
                            Option 4
                        </label>
                        <input type="text" id="editOption4" className="input" value="Car" />
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-check-circle"></i>
                            Correct Answer
                        </label>
                        <select id="editCorrectAnswer" className="select">
                            <option value="1">Option 1</option>
                            <option value="2" selected>Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-tags"></i>
                            Category
                        </label>
                        <select id="editCategory" className="select">
                            <option value="vocabulary" selected>Vocabulary</option>
                            <option value="grammar">Grammar</option>
                            <option value="reading">Reading</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-layer-group"></i>
                            Level
                        </label>
                        <select id="editLevel" className="select">
                            <option value="beginner" selected>Beginner</option>
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
                            Update Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditQuestion