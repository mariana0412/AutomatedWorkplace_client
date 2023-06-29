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
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });
                if (response.status === 403)
                    localStorage.removeItem('token');
                else {
                    const data = await response.json();
                    setGroups(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchGroups();
    }, [order, groups]);

    return groups;
};
