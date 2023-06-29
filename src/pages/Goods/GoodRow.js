import {Button, ButtonGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Link} from "react-router-dom";
import {useState} from "react";

const GoodRow = ({ good, groups, handleDelete }) => {
    const groupName = groups.find(group => group.id === good.groupId)?.name;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantityAction, setQuantityAction] = useState(null);
    const [quantityChange, setQuantityChange] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    const openModal = (action) => {
        setQuantityAction(action);
        setIsModalOpen(true);
        setErrorMessage('');
    };

    const closeModal = () => {
        setQuantityChange(1);
        setIsModalOpen(false);
    }

    const handleUpdateQuantity = async () => {
        const url = `/api/goods/${good.id}`;
        const originalQuantity = good.quantity;

        if(quantityAction === 'add')
            good.quantity += quantityChange;
        else
            good.quantity -= quantityChange;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(good)
        });

        if (response.status === 409) {
            good.quantity = originalQuantity;
            setErrorMessage(`Кількість товару не може бути від'ємною!`);
            return;
        }
        else if (response.status === 403)
            localStorage.removeItem('token');

        closeModal();
    };


    return (
        <tr key={good.id}>
            <td>{good.name}</td>
            <td>{good.description}</td>
            <td>{good.producer}</td>
            <td>{good.price}</td>
            <td>
                {good.quantity}
                <ButtonGroup>
                    <Button className="btn me-1 buttonWithMargins edit-button" size="sm" onClick={() => openModal('add')}>
                        +
                    </Button>
                    <Button className="btn me-1 buttonWithMargins edit-button" size="sm" onClick={() => openModal('reduce')}>
                        -
                    </Button>
                </ButtonGroup>
            </td>
            <td>{groupName}</td>
            <td>
                <ButtonGroup>
                    <Button className="btn ms-3 buttonWithMargins edit-button" size="sm" tag={Link} to={"/goods/" + good.id}>
                        Редагувати
                    </Button>
                    <Button className="btn me-3 buttonWithMargins delete-button" onClick={() => handleDelete(good)}>
                        Видалити
                    </Button>
                </ButtonGroup>
            </td>

            <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)}>
                <ModalHeader toggle={() => setIsModalOpen(false)}>
                    {quantityAction === 'add' ? 'Скільки товару прийшло?' : 'Скільки одиниць товару бажаєте списати?'}
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="number"
                        min="1"
                        value={quantityChange}
                        onChange={e => {
                            const value = Number(e.target.value);
                            if (value > 0) {
                                setQuantityChange(value);
                            }
                        }}
                    />
                    {
                        errorMessage
                        &&
                        <div style={{color: 'red', marginTop: '10px'}}>
                            {errorMessage}
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdateQuantity}>Оновити кількість</Button>
                    <Button color="secondary" onClick={() => closeModal()}>Скасувати</Button>
                </ModalFooter>
            </Modal>

        </tr>
    );
}

export default GoodRow;
