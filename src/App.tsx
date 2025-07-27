import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppRouter } from './components/AppRouter';
import { ModalsManager } from './components/ModalsManager';
import { AnnonceProvider } from './context/AnnonceContext';
import { AuthProvider } from './context/AuthContext';
import type { Annonce } from './types/Annonce';

function AppContent() {
    const [annonce, setAnnonce] = useState<Annonce | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const handleCreate = () => {
        setAnnonce(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (annonce: Annonce) => {
        setAnnonce(annonce);
        setIsModalOpen(true);
    };

    const handleView = (annonce: Annonce) => {
        setAnnonce(annonce);
        setIsViewModalOpen(true);
    };

    const handleCloseModal = () => {
        setAnnonce(undefined);
        setIsModalOpen(false);
    };

    const handleCloseViewModal = () => {
        setAnnonce(undefined);
        setIsViewModalOpen(false);
    };

    const handleCloseChangePassword = () => {
        setIsChangePasswordOpen(false);
    };

    const handleChangePassword = () => {
        setIsChangePasswordOpen(true);
    };

    return (
        <Router>
            <Layout onChangePassword={handleChangePassword}>
                <AppRouter onEdit={handleEdit} onView={handleView} onCreate={handleCreate} />
            </Layout>

            <ModalsManager
                annonce={annonce}
                isModalOpen={isModalOpen}
                isViewModalOpen={isViewModalOpen}
                isChangePasswordOpen={isChangePasswordOpen}
                onCloseModal={handleCloseModal}
                onCloseViewModal={handleCloseViewModal}
                onCloseChangePassword={handleCloseChangePassword}
            />
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AnnonceProvider>
                <AppContent />
            </AnnonceProvider>
        </AuthProvider>
    );
}

export default App;
