import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../../components/AppNavbar';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useGroups } from '../../hooks/group/useGroups';
import useGroupModal from '../../hooks/group/useGroupModal';

const Groups = () => {
    const navigate = useNavigate();
    const { deleteGroupModal, toggleModal, handleDelete, confirmDelete } = useGroupModal();
    const [order, setOrder] = useState('');
    const groups = useGroups(order);

    const handleEdit = async (groupId) => {
        navigate(`/groups/${groupId}`); // Перехід на сторінку редагування групи з передачею ID
    };

    const handleAdd = () => {
        navigate('/groups/new'); // Перехід на сторінку додавання групи
    };

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
    };

    return (
        <div>
            <AppNavbar />
            <div className="d-flex justify-content-between mt-3 mx-5 mb-3">
                <div className="d-flex align-items-center">
                    <select className="form-select me-2" value={order} onChange={handleOrderChange}>
                        <option value="">Сортування</option>
                        <option value="asc">від А до Я</option>
                        <option value="desc">від Я до А</option>
                    </select>
                    <button className="btn btn-success" onClick={handleAdd} style={{ whiteSpace: 'nowrap' }}>
                        Додати групу
                    </button>
                </div>
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
                                <button className="btn me-1"
                                        onClick={() => handleEdit(group.id)}
                                        style={{ backgroundColor: "#6b6bfa", color: "white"}}>
                                    Редагувати
                                </button>
                                <button className="btn ms-1"
                                        onClick={() => handleDelete(group)}
                                        style={{ backgroundColor: "#e86173", color: "white"}}>
                                    Видалити
                                </button>
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
