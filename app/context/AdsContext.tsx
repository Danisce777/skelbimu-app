import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, createAd, deleteAd, getAllAds, updateAd } from "../services/firebaseService";

export enum Category {
    ElectricGuitars = "Electric Guitars",
    AcousticGuitars = "Acoustic Guitars",
    BassGuitars = "Bass Guitars",
    Amplifiers = "Amplifiers",
    DigitalPianos = "Digital Pianos",
    Synthesizers = "Synthesizers",
    Wind = "Wind Instruments",
    Drums = "Drum Instruments",
    Other = "Other Instruments or Gear",
}

// ka turi Addsas
export type Ad = {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string[];
    contacts: string;
    category: Category;
    creatorId: string;
}

// funkcijos, kurias duos Context 
type AdContextType = {

    ads: Ad[];
    addAd: (ad: Omit<Ad, 'id' | 'creatorId'>) => Promise<void>;
    loading: boolean;
    removeAd: (adId: string) => Promise<void>
    editAd: (adId: string, updatedAd: Omit<Ad, 'id'>) => Promise<void>
} 

// sukuriam contexta kuris gali buti AdContextType arba undefined (tarsi global storage)
const AdContext = createContext<AdContextType | undefined>(undefined);

 type AdProviderProps = {
    children: ReactNode;
}

export const AdProvider = ( {children}: AdProviderProps) => {

    const[ads, setAds] = useState<Ad[]>([]);
    const[loading, setLoading] = useState<boolean>(true);

    const addAd = async (newAd: Omit<Ad, 'id'| "creatorId"> ) => {
        try {
            const adId = await createAd(newAd);
            setAds(prev => [...prev, { ...newAd, id: adId, creatorId: auth.currentUser!.uid }]);

        } catch (error) {
            console.error('Error adding ad:', error);
            throw error;
        }
    }

    const getAds = async () => {
        try {
            setLoading(true);
            const fetchedAds = await getAllAds();
            setAds(fetchedAds);
        } catch (error) {
            console.error('Error fetching ads:', error);
        } finally {
            setLoading(false);
        }
    }

    const removeAd = async (adId: string) => {
        try {
            await deleteAd(adId);
            
            setAds(prev => prev.filter(ad => ad.id !== adId));
            
            console.log('Ad deleted successfully');
        } catch (error) {
            console.error('Error deleting ad:', error);
            throw error;
        }
    };

    const editAd = async (adId: string, updatedAd: Omit<Ad, 'id'>) => {
        try {
            await updateAd(adId, updatedAd);
            
            setAds(prev => prev.map(ad => 
                ad.id === adId ? { ...updatedAd, id: adId } : ad
            ));
            
            console.log('Ad updated successfully');
        } catch (error) {
            console.error('Error updating ad:', error);
            throw error;
        }
    };

    useEffect( () => {
        getAds();
    }, [] ) 
    // Empty array = runnint tik viena karta paleidziant

    const value: AdContextType = {
        ads,
        addAd,
        loading,
        editAd,
        removeAd
    };

    return (
        <AdContext.Provider value={value}>
            {children}
        </AdContext.Provider>
    );
}

export const useAds = () => {
    const context = useContext(AdContext);

    if (context === undefined) {
        throw new Error("useAds must be used within an AdProvider");
    }
    
    return context;
};

