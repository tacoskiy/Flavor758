'use client';

import {useEffect, useState} from 'react';
import ReviewCard from '../components/elements/ReviewCard/reviewCard';

interface SavedShop {
    id: number;
    shopName: string;
    description: string;
    coverImage: string;
    get_average_rating: number;
}

function SavedShopsPage(){
    const [savedShops, setSavedShops] = useState<SavedShop[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/savedShops', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch saved shops');
            }
            return response.json();
        }).then((data) => {
            console.log('Saved shops:', data);
            setSavedShops(data);
        }).catch((error) => {
            console.error('Error fetching saved shops:', error);
        });
    },[])

    return(
        <section>
            {savedShops.map((shop) => (
                <ReviewCard 
                    key={shop.id}
                    imageSrc={shop.coverImage || '/img/no-image.png'}
                    imageAlt={shop.shopName}
                    title={shop.shopName}
                    description={shop.description}
                    rating={shop.get_average_rating || 0}
                    id={shop.id}
                />
            ))};
        </section>
    );    
}

export default SavedShopsPage;