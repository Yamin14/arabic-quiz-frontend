import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import Spinner from "../layout/Spinner";
import api from "../../api/api";
import { NotFound } from "../layout/NotFound";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {

    //get id from params
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        points: 0,
        level: 1,
        quizzesTaken: 0,
        classCode: ''
    });

    //current user
    const { user, logout } = useAuth();

    //fetch profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/users/${id}`);
                setProfile(response.data)
                setError(false);           
            } catch (error) {
                console.log("Error fetching profile: ", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [id, user])

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <NotFound />
    }

    return (
        <div className="page">
            <div className="mt-4">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-xl font-bold">
                            <i className="fas fa-id-card"></i>{' '}
                            Profile
                        </h2>
                    </div>
                    <div className="card-body">
                        <div className="profile-info mb-4">
                            <div className="profile-field">
                                <span className="field-label">
                                    <i className="fas fa-user"></i>{' '}
                                    Name:
                                </span>
                                <span className="field-value">{profile.name}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">
                                    <i className="fas fa-envelope"></i>{' '}
                                    Email:
                                </span>
                                <span className="field-value">{profile.email}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">
                                    <i className="fas fa-users"></i>{' '}
                                    Class Code:
                                </span>
                                <span className="field-value">{profile.classCode}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">
                                    <i className="fas fa-level-up-alt"></i>{' '}
                                    Level:
                                </span>
                                <span className="field-value">{profile.level}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">
                                    <i className="fas fa-star"></i>{' '}
                                    Points:
                                </span>
                                <span className="field-value">{profile.points}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">
                                    <i className="fas fa-clipboard-list"></i>{' '}
                                    Quizzes Taken:
                                </span>
                                <span className="field-value">{profile.quizzesTaken}</span>
                            </div>
                        </div>
                        {user && user.id == id ? (<div className="text-center">
                            <Link to={`/profile/edit/${id}`} className="btn btn-primary">
                                <i className="fas fa-edit"></i>
                                Edit
                            </Link>
                            <button className="btn btn-outline" onClick={() => logout()}>
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </button>
                        </div>) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile