import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../layout/Spinner';

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({children}: Props) => {

    const { user, loading } = useAuth() || { user: null, loading: false };

    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <Navigate to='/login' replace />
    }

    return (
        <>{children}</>
    )

}

export default ProtectedRoute