import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    onChangePassword: () => void;
}

export function Layout({ children, onChangePassword }: LayoutProps) {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

            {/* Main content */}
            <div className="drawer-content flex flex-col">
                {/* Mobile menu button */}
                <div className="navbar lg:hidden bg-base-300">
                    <div className="flex-none">
                        <label htmlFor="sidebar-drawer" className="btn btn-square btn-ghost">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <span className="text-xl font-bold">Matériel</span>
                    </div>
                </div>

                {/* Page content */}
                <main className="min-h-screen bg-base-200">
                    {children}
                </main>
            </div>

            {/* Sidebar */}
            <Sidebar
                onChangePassword={onChangePassword}
                onLogout={handleLogout}
            />
        </div>
    );
}