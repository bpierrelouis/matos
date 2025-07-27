import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    onChangePassword: () => void;
    onLogout: () => void;
}

export function Sidebar({ onChangePassword, onLogout }: SidebarProps) {
    const location = useLocation();
    
    const menuItems = [
        { path: '/annonces', label: 'Toutes les annonces' },
        { path: '/mes-annonces', label: 'Mes annonces' },
    ];

    return (
        <div className="drawer-side">
            <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
            <aside className="min-h-full w-80 bg-base-200 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-base-300">
                    <h1 className="text-xl font-bold">Matériel</h1>
                    <p className="text-sm text-base-content/70 mt-1">Gestion des équipements</p>
                </div>

                {/* Menu items */}
                <nav className="flex-1 p-6">
                    <div className="space-y-3">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`btn w-full justify-start text-left ${
                                    location.pathname === item.path 
                                        ? 'btn-primary' 
                                        : 'btn-ghost'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Bottom actions */}
                <div className="p-4 border-t border-base-300 space-y-2">
                    <button
                        className="btn btn-outline btn-sm w-full"
                        onClick={onChangePassword}
                    >
                        Changer le mot de passe
                    </button>
                    <button
                        className="btn btn-outline btn-error btn-sm w-full"
                        onClick={onLogout}
                    >
                        Se déconnecter
                    </button>
                </div>
            </aside>
        </div>
    );
}