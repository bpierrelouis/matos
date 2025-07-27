import type { Annonce } from '../types/Annonce';

interface AnnonceViewProps {
    annonce: Annonce;
    onClose: () => void;
}

export function AnnonceView({ annonce, onClose }: AnnonceViewProps) {
    return (
        <div>
            <h3 className="text-lg font-bold mb-4">
                Détails de l'annonce
            </h3>

            <div className="space-y-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Titre</span>
                    </label>
                    <div className="input input-bordered w-full bg-base-200 text-base-content">
                        {annonce.titre}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Unité</span>
                        </label>
                        <div className="input input-bordered bg-base-200 text-base-content">
                            {annonce.unite}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Base</span>
                        </label>
                        <div className="input input-bordered bg-base-200 text-base-content">
                            {annonce.base}
                        </div>
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date de création</span>
                    </label>
                    <div className="input input-bordered bg-base-200 text-base-content">
                        {annonce.dateCreation.toLocaleDateString()}
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <div className="textarea textarea-bordered h-32 w-full bg-base-200 text-base-content p-3">
                        {annonce.description || 'Aucune description'}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={onClose}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}