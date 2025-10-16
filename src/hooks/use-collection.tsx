
import { useState, useEffect } from 'react';
import { onSnapshot, query, collection, where, getDocs, Query, DocumentData, CollectionReference } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type CollectionQuery = Query<DocumentData> | CollectionReference<DocumentData> | null;

export const useCollection = (query: CollectionQuery) => {
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!query) {
            setData([]);
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(query, (snapshot) => {
            const results: any[] = [];
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            setData(results);
            setLoading(false);
        }, (err) => {
            console.error("useCollection error:", err);
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [query]);

    return { data, loading, error };
};

    