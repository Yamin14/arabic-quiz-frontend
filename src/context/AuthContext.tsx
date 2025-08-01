import { createContext, useContext, useEffect, useState } from 'react';
import useCookie, { removeCookie } from 'react-use-cookie';
import api from '../api/api';

interface Props {
    children: React.ReactNode;
}

interface User {
    id: string;
    email: string;
    name: string;
    classCode: string;
    points: number;
    level: number;
    role: string;
    quizzesTaken: number;
}

//context
const AuthContext = createContext<{
    user: User | null,
    loading: boolean,
    token: string | null,
    register: (formData: { email: string, password: string, name: string, classCode: string }) => Promise<boolean>,
    login: (credentials: { email: string, password: string }) => Promise<boolean>,
    update: (formData: { id: string, name: string }) => Promise<boolean>,
    logout: () => void
} | undefined>(undefined);

//auth provider
export const AuthProvider = ({ children }: Props) => {

    const [token, setToken, removeToken] = useCookie("token", '0');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    //verify token and fetch user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await api.get('/auth/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setUser(null);
                    removeToken();
                    removeCookie("token");
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
                setToken('0');
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    //register
    const register = async (formData: { email: string, password: string, name: string, classCode: string }) => {
        try {
            setLoading(true);
            const response = await api.post('/api/users', formData);

            if (response.status === 200) {
                setUser(response.data);
                return true;
            } else {
                setUser(null);
                removeCookie("token");
                removeToken();
                return false;
            }
        } catch (error) {
            console.error('Sign up failed:', error);
            setUser(null);
            removeCookie("token");
            removeToken();
            return false;
        } finally {
            setLoading(false);
        }
    }

    //login
    const login = async (credentials: { email: string, password: string }) => {
        try {
            setLoading(true);
            const response = await api.post('/auth/login', credentials);

            if (response.status === 200) {
                setUser(response.data);
                return true;
            } else {
                setUser(null);
                removeCookie("token");
                removeToken();
                return false;
            }
        } catch (error) {
            console.error('Login failed:', error);
            setUser(null);
            removeCookie("token");
            removeToken();
            return false;
        } finally {
            setLoading(false);
        }
    }

    //update
    const update = async (formData: { id: string, name: string }) => {
        try {
            setLoading(true);
            const response = await api.put(`/api/users/${formData.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setUser(response.data);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Update failed:', error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    //logout
    const logout = async () => {
        try {
            setLoading(true);
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Error: ", error)
        } finally {
            setUser(null);
            removeCookie("token");
            removeToken();
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, token, register, login, update, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const { user, loading, token, login, update, logout, register } = context;
    return { user, loading, token, login, update, logout, register };
};