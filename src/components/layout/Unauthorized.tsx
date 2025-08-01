
const Unauthorized = () => {
    return (
        <div id="unauthorizedPage" className="page">
            <div className="error-container">
                <div className="error-code">401</div>
                <h2 className="text-2xl font-bold mb-3 danger-red">
                    <i className="fas fa-ban"></i>{' '}
                    Unauthorized Access
                </h2>
                <p className="text-lg text-muted mb-4">You don't have permission to access this page.</p>
                <div className="text-center">
                    <button className="btn btn-outline">
                        <i className="fas fa-home"></i>
                        Go Back Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized