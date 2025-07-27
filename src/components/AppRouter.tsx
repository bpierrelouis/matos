import { Routes, Route, Navigate } from 'react-router-dom';
import { AllAnnouncements } from '../pages/AllAnnouncements';
import { MyAnnouncements } from '../pages/MyAnnouncements';
import type { Annonce } from '../types/Annonce';

interface AppRouterProps {
    onEdit: (annonce: Annonce) => void;
    onView: (annonce: Annonce) => void;
    onCreate: () => void;
}

export function AppRouter({ onEdit, onView, onCreate }: AppRouterProps) {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/annonces" replace />} />
            <Route 
                path="/annonces" 
                element={<AllAnnouncements onEdit={onEdit} onView={onView} onCreate={onCreate} />} 
            />
            <Route 
                path="/mes-annonces" 
                element={<MyAnnouncements onEdit={onEdit} onView={onView} onCreate={onCreate} />} 
            />
        </Routes>
    );
}