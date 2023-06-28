import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useGroupForm = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (id) {
            fetchGroup();
        }
    }, [id]);

    const fetchGroup = async () => {
        try {
            const response = await fetch(`/api/group/${id}`, {
                method: 'GET',
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiZXhwIjoxNjg4MDQwOTU3LCJpYXQiOjE2ODc5NTQ1NTd9.l8z_K5GEkRqVwJFNPCU_1Q5QFve6dIbGxM7uRTP0y-U',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
            } else {
                console.error('Error fetching group');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return {
        id,
        name,
        description,
        handleNameChange,
        handleDescriptionChange,
        fetchGroup,
    };
};
