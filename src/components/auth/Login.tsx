import { useState } from "react";
import { Link } from "react-router"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formState;
    const { login } = useAuth();
    const nav = useNavigate();

    //handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    //handle submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login({email, password})
            .then(() => {
                nav('/')
            });
    }

    //return
    return (
        <div id="loginPage" className="page">
            <div className="form-container">
                <h2 className="text-2xl font-bold text-center mb-4">
                    <i className="fas fa-sign-in-alt"></i>{' '}
                    Sign In
                </h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-envelope"></i>{' '}
                            Email
                        </label>
                        <input type="email" name="email" value={email} onChange={handleInputChange} className="input" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-lock"></i>{' '}
                            Password
                        </label>
                        <input type="password" name='password' value={password} onChange={handleInputChange} className="input" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-full mb-3">
                        <i className="fas fa-sign-in-alt"></i>
                        Log In
                    </button>
                    <p className="text-center">
                        <Link to="/register" className="form-link">Don't have an account? Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login