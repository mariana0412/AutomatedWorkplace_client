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
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });

            if (response.ok) {
                console.log(`Delete group with ID ${groupId}`);
            }
            else if (response.status === 403)
                localStorage.removeItem('token');
            else {
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
