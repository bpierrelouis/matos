import { useAnnonces } from '../context/AnnonceContext';
import { useAuth } from '../context/AuthContext';
import { AnnonceCard } from './AnnonceCard';
import type { Annonce } from '../types/Annonce';

interface UserAnnouncementsProps {
    onEdit: (annonce: Annonce) => void;
    onView: (annonce: Annonce) => void;
    onCreate: () => void;
}

export function UserAnnouncements({ onEdit, onView, onCreate }: UserAnnouncementsProps) {
    const { annonces } = useAnnonces();
    const { user } = useAuth();

    // Filter announcements by current user's unit and base
    const userAnnonces = annonces.filter(annonce => 
        user && annonce.unite === user.unite && annonce.base === user.base
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Mes annonces</h1>
                    <p className="text-base-content/70 mt-1">
                        {user && `${user.unite} - ${user.base}`}
                    </p>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={onCreate}
                >
                    Nouvelle annonce
                </button>
            </div>

            {userAnnonces.length === 0 ? (
                <div className="text-center py-16">
                    <div className="max-w-sm mx-auto">
                        <p className="text-base-content/70 text-lg">Vous n'avez aucune annonce</p>
                        <p className="text-base-content/50 text-sm mt-2">Publiez votre première annonce pour commencer</p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6">
                    {userAnnonces.map((annonce) => (
                        <AnnonceCard
                            key={annonce.id}
                            annonce={annonce}
                            onEdit={onEdit}
                            onView={onView}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}