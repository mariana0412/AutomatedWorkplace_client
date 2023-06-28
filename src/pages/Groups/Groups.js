import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import AppNavbar from '../../components/AppNavbar';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();
    const [deleteGroupModal, setDeleteGroupModal] = useState(false);
    const [groupToBeDeleted, setGroupToBeDeleted] = useState(null);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await fetch('/api/group', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiZXhwIjoxNjg4MDQwOTU3LCJpYXQiOjE2ODc5NTQ1NTd9.l8z_K5GEkRqVwJFNPCU_1Q5QFve6dIbGxM7uRTP0y-U'
                }
            });
            const data = await response.json();
            setGroups(data);
            await fetchGroups();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (groupId) => {
        try {
            const response = await fetch(`/api/group/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiZXhwIjoxNjg4MDQwOTU3LCJpYXQiOjE2ODc5NTQ1NTd9.l8z_K5GEkRqVwJFNPCU_1Q5QFve6dIbGxM7uRTP0y-U'
                }
            });

            if (response.ok) {
                console.log(`Edit group with ID ${groupId}`);
            } else {
                console.error('Error editing group');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleAdd = () => {
        navigate('/groups/add'); // Перехід на сторінку додавання групи
    };

    const toggleModal = () => setDeleteGroupModal(!deleteGroupModal);

    const handleDelete = async (group) => {
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

    return (
        <div>
            <AppNavbar />
            <div className="text-end mt-3 me-3">
                <button className="btn btn-primary" onClick={handleAdd}>Додати групу</button>
            </div>
            <div className="table-responsive container">
                <table className="table table-bordered table-width">
                    <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Опис</th>
                        <th>Дія</th>
                    </tr>
                    </thead>
                    <tbody>
                    {groups.map((group) => (
                        <tr key={group.id}>
                            <td>{group.name}</td>
                            <td>{group.description}</td>
                            <td className="text-center">
                                <button className="btn btn-primary me-1" onClick={() => handleEdit(group.id)}>Редагувати</button>
                                <button className="btn btn-danger ms-1" onClick={() => handleDelete(group)}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Modal isOpen={deleteGroupModal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Підтвердіть видалення</ModalHeader>
                    <ModalBody>
                        Ви точно хочете видалити?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={confirmDelete}>Так</Button>
                        <Button color="secondary" onClick={toggleModal}>Ні</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
};


export default Groups;