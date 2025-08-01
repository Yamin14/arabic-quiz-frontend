import { Link } from "react-router"

export const NotFound = () => {
    return (
        <div id="notFoundPage" className="page">
            <div className="error-container">
                <div className="error-code">404</div>
                <h2 className="text-2xl font-bold mb-3">
                    <i className="fas fa-exclamation-triangle"></i>{' '}
                    Page Not Found
                </h2>
                <p className="text-lg text-muted mb-4">The page you're looking for doesn't exist.</p>
                <Link to='/' className="btn btn-primary">
                    <i className="fas fa-home"></i>
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}
