import { useState } from 'react';

const useGroupModal = () => {
    const [deleteGroupModal, setDeleteGroupModal] = useState(false);
    const [groupToBeDeleted, setGroupToBeDeleted] = useState(null);

    const toggleModal = () => setDeleteGroupModal(!deleteGroupModal);

    const handleDelete = (group) => {
        setGroupToBeDeleted(group);
        toggleModal();
    };

    const confirmDelete = async () => {
        const groupId = groupToBeDeleted.id;

        try {
            const response = await fetch(`/api/group/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiZXhwIjoxNjg4MDQwOTU3LCJpYXQiOjE2ODc5NTQ1NTd9.l8z_K5GEkRqVwJFNPCU_1Q5QFve6dIbGxM7uRTP0y-U'
                }
            });

            if (response.ok) {
                console.log(`Delete group with ID ${groupId}`);
            } else {
                console.error('Error deleting group');
            }
        } catch (error) {
            console.error(error);
        }

        toggleModal();
    };

    return {
        deleteGroupModal,
        toggleModal,
        handleDelete,
        confirmDelete,
    };
};

export default useGroupModal;
