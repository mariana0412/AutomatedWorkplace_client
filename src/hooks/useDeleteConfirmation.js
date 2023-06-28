import { useState } from 'react';

const useDeleteConfirmation = (updateGoodsAfterDeletion) => {
    const [deleteGoodModal, setDeleteGoodModal] = useState(false);
    const [goodToBeDeleted, setGoodToBeDeleted] = useState(null);

    const toggleModal = () => setDeleteGoodModal(!deleteGoodModal);

    const handleDelete = (good) => {
        setGoodToBeDeleted(good);
        toggleModal();
    };

    const confirmDelete = async () => {
        const deletedGoodId = goodToBeDeleted.id;

        try {
            const url = `/api/goods/${deletedGoodId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3ODkwNzIwfQ._0WNSNU5noAuU2EbROJGJpPwqcFUJuheaa-eaMUrdWg`,
                }
            });

            const data = await response.text();

            if (response.ok)
                updateGoodsAfterDeletion(deletedGoodId);
            else
                alert(data.message);
        } catch (error) {
            console.log(error);
        }

        toggleModal();
    };

    return { deleteGoodModal, goodToBeDeleted, toggleModal, handleDelete, confirmDelete };
};

export default useDeleteConfirmation;
