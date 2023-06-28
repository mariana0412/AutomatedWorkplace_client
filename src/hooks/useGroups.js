import { useEffect, useState } from 'react';

export const useGroups = (order) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                let url = '/api/group';
                if (order && order !== "") {
                    url += `?order=${order}`;
                }
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiZXhwIjoxNjg4MDQwOTU3LCJpYXQiOjE2ODc5NTQ1NTd9.l8z_K5GEkRqVwJFNPCU_1Q5QFve6dIbGxM7uRTP0y-U',
                    },
                });
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGroups();
    }, [order, groups]);

    return groups;
};
