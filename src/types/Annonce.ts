export interface Annonce {
  id: string;
  titre: string;
  description: string;
  unite: string;
  base: string;
  dateCreation: Date;
}

export type CreateAnnonceData = Omit<Annonce, 'id' | 'dateCreation'>;
export type UpdateAnnonceData = Partial<CreateAnnonceData>;