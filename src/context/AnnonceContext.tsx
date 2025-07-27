import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Annonce, CreateAnnonceData, UpdateAnnonceData } from '../types/Annonce';

interface AnnonceContextType {
  annonces: Annonce[];
  createAnnonce: (data: CreateAnnonceData) => void;
  updateAnnonce: (id: string, data: UpdateAnnonceData) => void;
  deleteAnnonce: (id: string) => void;
  getAnnonce: (id: string) => Annonce | undefined;
}

const AnnonceContext = createContext<AnnonceContextType | undefined>(undefined);

export function AnnonceProvider({ children }: { children: ReactNode }) {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);

  const createAnnonce = (data: CreateAnnonceData) => {
    const newAnnonce: Annonce = {
      id: crypto.randomUUID(),
      ...data,
      dateCreation: new Date(),
    };
    setAnnonces(prev => [...prev, newAnnonce]);
  };

  const updateAnnonce = (id: string, data: UpdateAnnonceData) => {
    setAnnonces(prev => 
      prev.map(annonce => 
        annonce.id === id ? { ...annonce, ...data } : annonce
      )
    );
  };

  const deleteAnnonce = (id: string) => {
    setAnnonces(prev => prev.filter(annonce => annonce.id !== id));
  };

  const getAnnonce = (id: string) => {
    return annonces.find(annonce => annonce.id === id);
  };

  return (
    <AnnonceContext.Provider 
      value={{ 
        annonces, 
        createAnnonce, 
        updateAnnonce, 
        deleteAnnonce, 
        getAnnonce 
      }}
    >
      {children}
    </AnnonceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAnnonces() {
  const context = useContext(AnnonceContext);
  if (context === undefined) {
    throw new Error('useAnnonces must be used within an AnnonceProvider');
  }
  return context;
}