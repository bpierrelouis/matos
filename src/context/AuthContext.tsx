import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: string;
    username: string;
    unite: string;
    base: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    changePassword: (newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUser: User = {
    id: '1',
    username: 'user@example.com',
    unite: 'ESIOC 62.430',
    base: '118',
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(mockUser); // Simulate logged in user

    const login = async (username: string, password: string): Promise<boolean> => {
        // Mock login logic
        if (username && password) {
            setUser(mockUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const changePassword = async (newPassword: string): Promise<boolean> => {
        // Mock password change logic
        if (newPassword && newPassword.length >= 6) {
            return true;
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}