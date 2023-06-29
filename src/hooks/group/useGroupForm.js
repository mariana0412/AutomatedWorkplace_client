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
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            });

            if (response.ok) {
                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
            } else if (response.status === 403)
                localStorage.removeItem('token');
            else {
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
    };
};
