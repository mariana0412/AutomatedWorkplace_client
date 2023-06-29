import { useEffect, useState } from 'react';

const useGoods = () => {
    const [goods, setGoods] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showEmpty, setShowEmpty] = useState(false);

    const fetchGoodsByGroup = async (groupId, name) => {
        let url = 'api/good';

        let queryParams = [];

        if (groupId)
            queryParams.push(`groupId=${String(groupId)}`);
        if (name)
            queryParams.push(`name=${String(name)}`);

        if (queryParams.length > 0)
            url += `?${queryParams.join('&')}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        if (response.status === 403) {
            localStorage.removeItem('token');
        } else {
            const data = await response.json();
            setGoods(data);
            setShowEmpty(data.length === 0);
        }
    };


    const fetchGroups = async () => {
        const response = await fetch(`/api/group`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        if (response.status === 403) {
            localStorage.removeItem('token');
        } else {
            const data = await response.json();
            setGroups(data);
        }
    };

    useEffect(() => {
        fetchGoodsByGroup();
        fetchGroups();
    }, []);

    const updateGoodsAfterDeletion = (deletedGoodId) => {
        let updatedGoods = goods.filter(good => good.id !== deletedGoodId);
        setGoods(updatedGoods);
    }

    return { goods, groups, showEmpty, updateGoodsAfterDeletion, fetchGoodsByGroup };
};

export default useGoods;
