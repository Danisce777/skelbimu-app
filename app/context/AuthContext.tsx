import { auth } from "@/FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    isGuest: boolean;
    setAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthProvider = ( {children}: AuthProviderProps ) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser);

            if(currentUser){
                setIsGuest(false)
            }

            setLoading(false);
        });

        return () => unsubscribe();

    }, []); // viena karta runnins paleidus

    const setAsGuest = () => {
        setIsGuest(true);
        setLoading(false);
    };

    return(
        <AuthContext.Provider value={ {user, loading, isGuest, setAsGuest} }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context;
}

  
