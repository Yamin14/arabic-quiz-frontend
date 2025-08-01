
const Spinner = () => {
    return (
        <div id="loadingPage" className="page">
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
            <p className="text-center mt-3">
                <i className="fas fa-hourglass-half"></i>{' '}
                Loading...
            </p>
        </div>
    )
}

export default Spinner