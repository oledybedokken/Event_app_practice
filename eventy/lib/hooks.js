import { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../lib/firebase';
export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    useEffect(() => {
        let unsubscribe;
        if (user) {
            unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
                setUsername(doc.data()?.username)
            })
        }
        else {
            setUsername(null);
        }
        return unsubscribe;
    }, [user]);
    return { user, username };
}