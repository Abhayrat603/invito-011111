
import { useState, useEffect } from 'react';
import { onSnapshot, DocumentReference, DocumentData } from 'firebase/firestore';

type DocQuery = DocumentReference<DocumentData> | null;

export const useDoc = (query: DocQuery) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!query) {
            setData(null);
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(query, (doc) => {
            if (doc.exists()) {
                setData({ id: doc.id, ...doc.data() });
            } else {
                setData(null);
            }
            setLoading(false);
        }, (err) => {
            console.error("useDoc error:", err);
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [query]);

    return { data, loading, error };
};

    