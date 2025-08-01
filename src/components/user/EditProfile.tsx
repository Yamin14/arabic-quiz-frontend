import { useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate, useParams } from "react-router";
import Unauthorized from "../layout/Unauthorized";
import Spinner from "../layout/Spinner";
import api from "../../api/api";

const EditProfile = () => {

    const { id } = useParams();
    const nav = useNavigate();

    //current user
    const { user, loading, update } = useAuth();

    const [formState, setFormState] = useState({
        id: user?.id || '',
        name: user?.name || ''
    })
    const name = formState.name;

    //handle change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    //handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        update(formState)
        .then(() => {
            nav(`/profile/${id}`);
        });
    }

    if (loading) {
        return <Spinner />
    }

    //unauthorized
    if (user?.id != id) {
        return <Unauthorized />
    }

    return (
        <div id="editProfilePage" className="page">
            <div className="form-container">
                <h2 className="text-2xl font-bold text-center mb-4">
                    <i className="fas fa-user-edit"></i>
                    Edit Profile
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label" >
                            <i className="fas fa-user"></i>
                            Name
                        </label>
                        <input type="text" onChange={handleInputChange} className="input" name='name' value={name} />
                    </div>
                    <div className="form-group">
                        <label className="label" >
                            <i className="fas fa-envelope"></i>
                            Email (Read Only)
                        </label>
                        <input type="email" id="editEmail" className="input light-gray" value="ahmed@example.com" readOnly />
                    </div>
                    <div className="navbar-nav">
                        <Link to={`/profile/${id}`} type="button" className="btn btn-outline">
                            <i className="fas fa-times"></i>
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-save"></i>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile