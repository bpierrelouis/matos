import { useAuth } from '../context/AuthContext';
import type { Annonce } from '../types/Annonce';

interface AnnonceCardProps {
    annonce: Annonce;
    onEdit: (annonce: Annonce) => void;
    onView: (annonce: Annonce) => void;
}

export function AnnonceCard({
    annonce,
    onEdit,
    onView
}: AnnonceCardProps) {
    const { user } = useAuth();

    const isOwner = user && annonce.unite === user.unite && annonce.base === user.base;

    const handleCardClick = () => {
        if (isOwner) {
            onEdit(annonce);
        } else {
            onView(annonce);
        }
    };


    return (
        <div
            className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
            onClick={handleCardClick}
        >
            <div className="card-body p-4">
                <div className="flex justify-between items-start">
                    <h2 className="card-title text-lg">{annonce.titre}</h2>
                    <div className="flex gap-2 items-center">
                        <div className="badge badge-outline text-xs">
                            {annonce.unite} - {annonce.base}
                        </div>
                        <div className="badge badge-neutral text-xs">
                            {annonce.dateCreation.toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}