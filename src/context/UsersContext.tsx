import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from './AuthContext';

interface Props {
    children: React.ReactNode;
}

interface User {
    _id: string;
    email: string;
    name: string;
    classCode: string;
    points: number;
    level: number;
    role: string;
    quizzesTaken: number;
}

//context
const UsersContext = createContext<{
    users: User[],
    loading: boolean,
    fetchUsers: () => void,
    deleteUser: (id: string) => void
} | undefined>(undefined);

//auth provider
export const UsersProvider = ({ children }: Props) => {

    const { user, token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    //verify token and fetch users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {   
        fetchUsers();
    }, [token, user?.classCode]);

    const deleteUser = async (id: string) => {
        try {
            setLoading(true);
            await api.delete(`/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            fetchUsers();
        } catch (error) {
            console.error('Error deleteing user:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <UsersContext.Provider value={{ users, loading, fetchUsers, deleteUser}}>
            {children}
        </UsersContext.Provider>
    )
};

export const useUsers = () => {
    const context = useContext(UsersContext);

    if (!context) {
        throw new Error('useUsers must be used within an UsersProvider');
    }

    const { users, loading, fetchUsers, deleteUser } = context;
    return { users, loading, fetchUsers, deleteUser };
};