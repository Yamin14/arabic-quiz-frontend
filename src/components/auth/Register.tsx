import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../../context/AuthContext";

const Register = () => {

    //state
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        name: '',
        classCode: ''
    })
    const { email, password, name, classCode } = formState;
    const nav = useNavigate();
    const { register } = useAuth();

    //show password
    const [showPassword, setShowPassword] = useState(false);

    //handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    //on select change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    //handle submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(formState)
        .then(() => {
            nav('/');
        });
    }

    return (
        <div id="signupPage" className="page">
            <div className="form-container">
                <h2 className="text-2xl font-bold text-center mb-4">
                    <i className="fas fa-user-plus"></i>{' '}
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-user"></i>{' '}
                            Name
                        </label>
                        <input required type="text" value={name} name="name" className="input" onChange={handleInputChange} placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-envelope"></i>{' '}
                            Email
                        </label>
                        <input required type="email" value={email} name='email' className="input" onChange={handleInputChange} placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-lock"></i>{' '}
                            Password
                        </label>
                        <input required type={showPassword ? 'text' : "password"} value={password} name='password' className="input" onChange={handleInputChange} placeholder="Create a password" />
                        <label className="text-sm mt-2">
                            <input 
                                type="checkbox"
                                checked={showPassword} 
                                onChange={() => setShowPassword(!showPassword)}/> Show Password
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="label">
                            <i className="fas fa-users"></i>{' '}
                            Class Code
                        </label>
                        <select required name='classCode' defaultValue={classCode} onChange={handleSelectChange} className="select">
                            <option value=''>Select Class Code</option>
                            <option value="B-3">B-3</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-full mb-3">
                        <i className="fas fa-user-plus"></i>
                        Sign Up
                    </button>
                    <p className="text-center">
                        <Link to="/login" className="form-link">Already have an account? Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register