import { useEffect, useState } from 'react';
import { useAnnonces } from '../context/AnnonceContext';
import { useAuth } from '../context/AuthContext';
import type { Annonce, CreateAnnonceData } from '../types/Annonce';

interface AnnonceFormProps {
    annonce?: Annonce;
    onClose: () => void;
    onDelete?: (id: string) => void;
}

const initialFormData: CreateAnnonceData = {
    titre: '',
    description: '',
    unite: '',
    base: '',
};

export function AnnonceForm({ annonce, onClose, onDelete }: AnnonceFormProps) {
    const { createAnnonce, updateAnnonce } = useAnnonces();
    const { user } = useAuth();
    const [formData, setFormData] = useState<CreateAnnonceData>(initialFormData);

    const isEditing = !!annonce;

    useEffect(() => {
        if (annonce) {
            setFormData(annonce);
        } else if (user) {
            // Pre-fill with user's data for new announcements
            setFormData({
                titre: '',
                description: '',
                unite: user.unite,
                base: user.base,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [annonce, user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.titre.trim() ||
            !formData.unite.trim() || !formData.base.trim()) {
            alert('Tous les champs sont obligatoires');
            return;
        }

        if (annonce) {
            updateAnnonce(annonce.id, formData);
        } else {
            createAnnonce(formData);
        }

        onClose();
    };

    const handleChange = (field: keyof CreateAnnonceData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDelete = () => {
        if (annonce && onDelete && confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
            onDelete(annonce.id);
            onClose();
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold mb-4">
                {isEditing ? 'Modifier l\'annonce' : 'Nouvelle annonce'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Titre *</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formData.titre}
                        onChange={(e) => handleChange('titre', e.target.value)}
                        placeholder="Titre du matériel"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Unité *</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={formData.unite}
                            onChange={(e) => handleChange('unite', e.target.value)}
                            placeholder="Ex: ESIOC 62.430"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Base *</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={formData.base}
                            onChange={(e) => handleChange('base', e.target.value)}
                            placeholder="Ex: 118"
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-32 w-full"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Description détaillée du matériel"
                    />
                </div>

                <div className="flex gap-4 justify-between">
                    <div>
                        {isEditing && onDelete && (
                            <button
                                type="button"
                                className="btn btn-outline btn-error"
                                onClick={handleDelete}
                            >
                                Supprimer
                            </button>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {isEditing ? 'Modifier' : 'Créer'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}