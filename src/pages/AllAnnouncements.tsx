import { AnnonceList } from '../components/AnnonceList';
import type { Annonce } from '../types/Annonce';

interface AllAnnouncementsProps {
    onEdit: (annonce: Annonce) => void;
    onView: (annonce: Annonce) => void;
    onCreate: () => void;
}

export function AllAnnouncements({ onEdit, onView, onCreate }: AllAnnouncementsProps) {
    return <AnnonceList onEdit={onEdit} onView={onView} onCreate={onCreate} />;
}