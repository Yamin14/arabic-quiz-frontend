import { Link } from "react-router";
import { useUsers } from "../../context/UsersContext"
import Spinner from "../layout/Spinner";

const Users = () => {

    const { users, loading, deleteUser } = useUsers();

    if (loading) {
        return <Spinner />
    }

    return (
        <div id="usersPage" className="page">
            <div className="mt-4">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-xl font-bold">
                            <i className="fas fa-users"></i>
                            All Users
                        </h2>
                    </div>
                    <div className="card-body">
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th><i className="fas fa-user"></i> Name</th>
                                        <th><i className="fas fa-envelope"></i> Email</th>
                                        <th><i className="fas fa-users"></i> Class Code</th>
                                        <th><i className="fas fa-level-up-alt"></i> Level</th>
                                        <th><i className="fas fa-star"></i> Points</th>
                                        <th><i className="fas fa-clipboard-list"></i> Quizzes</th>
                                        <th><i className="fas fa-cogs"></i> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.map((user) => (<tr key={user._id}>
                                        <td><Link to={`/profile/${user._id}`} className="table-link">{user.name}</Link></td>
                                        <td>{user.email}</td>
                                        <td>{user.classCode}</td>
                                        <td>{user.level}</td>
                                        <td>{user.points}</td>
                                        <td>{user.quizzesTaken}</td>
                                        <td>
                                            <Link to={`/profile/${user._id}`} className="btn btn-primary btn-sm mr-1">
                                                <i className="fas fa-eye"></i>
                                                View
                                            </Link>
                                            <Link to={`/profile/edit/${user._id}`} className="btn btn-outline btn-sm mr-1">
                                                <i className="fas fa-edit"></i>
                                                Edit
                                            </Link>
                                            <button onClick={() => deleteUser(user._id)} className="btn btn-danger btn-sm">
                                                <i className="fas fa-trash"></i>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Users