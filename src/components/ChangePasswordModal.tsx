import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
    const { changePassword } = useAuth();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Les nouveaux mots de passe ne correspondent pas');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Le nouveau mot de passe doit contenir au moins 6 caractères');
            return;
        }

        setIsLoading(true);
        try {
            const success = await changePassword(formData.newPassword);
            if (success) {
                setFormData({ newPassword: '', confirmPassword: '' });
                onClose();
                alert('Mot de passe modifié avec succès');
            } else {
                setError('Erreur lors de la modification du mot de passe');
            }
        } catch {
            setError('Erreur lors de la modification du mot de passe');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const handleClose = () => {
        setFormData({ newPassword: '', confirmPassword: '' });
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Changer le mot de passe</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nouveau mot de passe *</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            value={formData.newPassword}
                            onChange={(e) => handleChange('newPassword', e.target.value)}
                            required
                            minLength={6}
                            placeholder="Minimum 6 caractères"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirmer le nouveau mot de passe *</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            required
                            placeholder="Confirmer le mot de passe"
                        />
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex gap-4 justify-end pt-4">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                'Modifier'
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </form>
        </dialog>
    );
}