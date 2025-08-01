import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    //check if logged in
    const { user, logout } = useAuth();

    //logout
    const handleLogout = () => {
        logout();
    }

    //return
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        <i className="fas fa-graduation-cap"></i>
                        Arabic Quiz
                    </Link>
                    <div className="navbar-nav">
                        {user ? (<>
                            <Link to={`/profile/${user.id}`} className="btn btn-white btn-sm">
                                {user.name}
                            </Link>
                            <button className="btn btn-white btn-sm"
                                onClick={() => handleLogout()}>
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </button>
                        </>) : (<>
                            <Link to='login' className="btn btn-white btn-sm">
                                <i className="fas fa-sign-in-alt"></i>
                                Sign In
                            </Link>
                            <Link to='register' className="btn btn-white btn-sm">
                                <i className="fas fa-user-plus"></i>
                                Sign Up
                            </Link>
                        </>)}

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar