import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../layout/Spinner';
import Unauthorized from '../layout/Unauthorized';

interface Props {
    children: React.ReactNode;
}

const AdminRoute = ({children}: Props) => {

    const { user, loading } = useAuth() || { user: null, loading: false };
    
    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <Navigate to='/login' replace />
    }

    if (user.role != 'admin') {
        return <Unauthorized />
    }

    return (
        <>{children}</>
    )

}

export default AdminRoute