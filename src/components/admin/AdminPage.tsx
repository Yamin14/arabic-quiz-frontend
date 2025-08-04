import { Link } from "react-router"

const AdminPage = () => {
    return (
        <div className="page">
            <div className="mt-4">
                <div className="card p-2">
                    <div className="text-center mb-2">
                        <Link to='/admin/users' className="btn btn-primary">
                            Users
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link to='/admin/questions' className="btn btn-primary">
                            Questions
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminPage