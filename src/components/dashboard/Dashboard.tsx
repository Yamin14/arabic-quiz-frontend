import { Link } from "react-router";
import { useUsers } from "../../context/UsersContext"
import Spinner from "../layout/Spinner";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {

  const { user } = useAuth();
  const { users, loading, fetchUsers } = useUsers();

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user])

  if (loading) {
    return <Spinner />
  }

  return (
    <div id="dashboardPage" className="page">
      <div className="mt-4">
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-bold">
              <i className="fas fa-trophy"></i>
              Leaderboard
            </h2>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th><i className="fas fa-user"></i> Name</th>
                    <th><i className="fas fa-level-up-alt"></i> Level</th>
                    <th><i className="fas fa-star"></i> Points</th>
                    <th><i className="fas fa-clipboard-list"></i> Quizzes Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td><Link to={`/profile/${user._id}`} className="table-link">{user.name}</Link></td>
                        <td>{user.level}</td>
                        <td>{user.points}</td>
                        <td>{user.quizzesTaken}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-center success-green">
              Level up on every 50 points.
            </p>

            {/* Quiz Links */}
            <div className="text-center mt-4">
              <Link to='/quiz/Vocabulary' className="btn btn-primary btn-lg">
                <i className="fas fa-play"></i>
                Take Vocabulary Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard