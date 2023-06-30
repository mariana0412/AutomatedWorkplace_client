import { useState } from 'react';

const useTotalCost = () => {
    const [totalCost, setTotalCost] = useState(0);

    const fetchTotalCost = async (groupId, name) => {
        let url = 'api/good/total-cost';

        let queryParams = [];

        if (groupId)
            queryParams.push(`groupId=${String(groupId)}`);
        if (name)
            queryParams.push(`name=${String(name)}`);

        if (queryParams.length > 0)
            url += `?${queryParams.join('&')}`;

        const totalCostResponse = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        const totalCostData = await totalCostResponse.text();
        const roundedTotalCost = parseFloat(parseFloat(totalCostData).toFixed(2));
        setTotalCost(roundedTotalCost);
    }

    return { totalCost, fetchTotalCost };
};

export default useTotalCost;
