import { UserAnnouncements } from '../components/UserAnnouncements';
import type { Annonce } from '../types/Annonce';

interface MyAnnouncementsProps {
    onEdit: (annonce: Annonce) => void;
    onView: (annonce: Annonce) => void;
    onCreate: () => void;
}

export function MyAnnouncements({ onEdit, onView, onCreate }: MyAnnouncementsProps) {
    return <UserAnnouncements onEdit={onEdit} onView={onView} onCreate={onCreate} />;
}