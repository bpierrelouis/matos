import { AnnonceForm } from './AnnonceForm';
import { AnnonceView } from './AnnonceView';
import { ChangePasswordModal } from './ChangePasswordModal';
import { useAnnonces } from '../context/AnnonceContext';
import type { Annonce } from '../types/Annonce';

interface ModalsManagerProps {
    annonce?: Annonce;
    isModalOpen: boolean;
    isViewModalOpen: boolean;
    isChangePasswordOpen: boolean;
    onCloseModal: () => void;
    onCloseViewModal: () => void;
    onCloseChangePassword: () => void;
}

export function ModalsManager({ 
    annonce, 
    isModalOpen, 
    isViewModalOpen,
    isChangePasswordOpen, 
    onCloseModal, 
    onCloseViewModal,
    onCloseChangePassword 
}: ModalsManagerProps) {
    const { deleteAnnonce } = useAnnonces();
    return (
        <>
            {/* Modal pour création/édition */}
            <dialog className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box w-11/12 max-w-2xl">
                    <AnnonceForm
                        annonce={annonce}
                        onClose={onCloseModal}
                        onDelete={deleteAnnonce}
                    />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={onCloseModal}>close</button>
                </form>
            </dialog>

            {/* Modal pour visualisation */}
            <dialog className={`modal ${isViewModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box w-11/12 max-w-2xl">
                    {annonce && (
                        <AnnonceView
                            annonce={annonce}
                            onClose={onCloseViewModal}
                        />
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={onCloseViewModal}>close</button>
                </form>
            </dialog>

            {/* Modal pour changement de mot de passe */}
            <ChangePasswordModal 
                isOpen={isChangePasswordOpen}
                onClose={onCloseChangePassword}
            />
        </>
    );
}