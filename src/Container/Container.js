import React, { useEffect, useState } from 'react';

import './Container.css';
import Carousel from '../Carousel/Carousel';

export default function Container() {
    const [image, setImage] = useState('');
    const [page, setPage] = useState(1);
    const apiKey = 'MEmDCipE92gdggnT2yNUGc6d1zF83j9tJJ6JREtJF22jm0sQeUykRil3';
    useEffect(() => {
        const params = {
            page,
            per_page: 1,
        };
        const queryParams = new URLSearchParams(params).toString();
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.pexels.com/v1/curated?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setImage(result.photos[0].src.original)
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [page, apiKey]); // Add dependencies
    const handleNextImg = () => {
        setPage((prev) => prev + 1)
    }
    const handlePrevImg = () => {
        if (page > 0)
            setPage((prev) => prev - 1)
    }
    return (
        <div className='container'>
            <button className='btn btn--prev' onClick={handlePrevImg}>&lt;</button>
            <Carousel img={image} />
            <button className='btn btn--next' onClick={handleNextImg}>&gt;</button>
        </div>
    );
}
