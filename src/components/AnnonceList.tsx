import { useAnnonces } from '../context/AnnonceContext';
import { AnnonceCard } from './AnnonceCard';
import type { Annonce } from '../types/Annonce';

interface AnnonceListProps {
    onEdit: (annonce: Annonce) => void;
    onView: (annonce: Annonce) => void;
    onCreate: () => void;
}

export function AnnonceList({ onEdit, onView, onCreate }: AnnonceListProps) {
    const { annonces } = useAnnonces();

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Matériel disponible</h1>
                    <p className="text-base-content/70 mt-1">Découvrez les équipements disponibles</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={onCreate}
                >
                    Nouvelle annonce
                </button>
            </div>

            {annonces.length === 0 ? (
                <div className="text-center py-16">
                    <div className="max-w-sm mx-auto">
                        <p className="text-base-content/70 text-lg">Aucune annonce disponible</p>
                        <p className="text-base-content/50 text-sm mt-2">Soyez le premier à publier une annonce</p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6">
                    {annonces.map((annonce) => (
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