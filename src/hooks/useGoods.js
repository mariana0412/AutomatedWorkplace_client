import { useEffect, useState } from 'react';

const useGoods = () => {
    const [goods, setGoods] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showEmpty, setShowEmpty] = useState(false);

    useEffect(() => {
        const fetchGoods = async () => {
            const response = await fetch(`api/good`, {
                headers: {
                    // TODO: change to user's token when auth is implemented
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3ODkwNzIwfQ._0WNSNU5noAuU2EbROJGJpPwqcFUJuheaa-eaMUrdWg`,
                },
            });
            const data = await response.json();
            setGoods(data);
            setShowEmpty(data.length === 0);
        };

        const fetchGroups = async () => {
            const response = await fetch(`/api/group`, {
                headers: {
                    // TODO: change to user's token when auth is implemented
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3ODkwNzIwfQ._0WNSNU5noAuU2EbROJGJpPwqcFUJuheaa-eaMUrdWg`,
                },
            });
            const data = await response.json();
            setGroups(data);
        };

        fetchGoods();
        fetchGroups();
    }, []);

    const updateGoodsAfterDeletion = (deletedGoodId) => {
        let updatedGoods = goods.filter(good => good.id !== deletedGoodId);
        setGoods(updatedGoods);
    }

    return { goods, groups, showEmpty, updateGoodsAfterDeletion };
};

export default useGoods;
