import AppNavbar from "../../components/AppNavbar";
import { Button, ButtonGroup, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Goods.css';
import {useEffect, useState} from "react";

const Goods = () => {

    const [goods, setGoods] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showEmpty, setShowEmpty] = useState(false);
    const [deleteGoodModal, setDeleteGoodModal] = useState(false);
    const [goodToBeDeleted, setGoodToBeDeleted] = useState(null);
    
    useEffect(() => {
        let url = `api/good`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3ODkwNzIwfQ._0WNSNU5noAuU2EbROJGJpPwqcFUJuheaa-eaMUrdWg`,
            }
        })
            .then(response => {
            if (response.status === 204)
                return null;
            else
                return response.json();
        })
            .then(data => {
                if (data) {
                    setGoods(data);
                    setShowEmpty(data.length === 0);
                } else {
                    setGoods([]);
                    setShowEmpty(true);
                }
            });

        fetch(`/api/group`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3ODkwNzIwfQ._0WNSNU5noAuU2EbROJGJpPwqcFUJuheaa-eaMUrdWg`,
            }
        })
            .then(response => response.json())
            .then(data => setGroups(data));
    }, [])

    const goodsList = goods.map(good => {
        const groupName = groups.find(group => group.id === good.groupId)?.name;

        return <tr key={good.id_product}>
            <td>{good.name}</td>
            <td>{good.description}</td>
            <td>{good.producer}</td>
            <td>{good.price}</td>
            <td>
                {good.quantity}
                <ButtonGroup>
                    <Button className="buttonWithMargins edit-button" size="sm">+</Button>
                    <Button className="buttonWithMargins edit-button" size="sm">-</Button>
                </ButtonGroup>
            </td>
            <td>{groupName}</td>
            <td>
                <ButtonGroup>
                    <Button className="buttonWithMargins edit-button" size="sm">Редагувати</Button>
                    <Button className="buttonWithMargins delete-button" size="sm" onClick={() => handleDelete(good)}>Видалити</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    const toggleModal = () => setDeleteGoodModal(!deleteGoodModal);

    const handleDelete = (good) => {
        setGoodToBeDeleted(good);
        toggleModal();
    };

    const confirmDelete = async () => {
        const deletedGoodId = goodToBeDeleted.id;

        try {
            const url =`/api/goods/${deletedGoodId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3ODkwNzIwfQ._0WNSNU5noAuU2EbROJGJpPwqcFUJuheaa-eaMUrdWg`,
                }
            })

            const data = await response.text();

            if (response.ok) {
                let updatedGoods = [...goods].filter(i => i.id !== deletedGoodId);
                setGoods(updatedGoods);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }

        toggleModal();
    };

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <Button className="buttonWithMargins" color="success">
                    Додати
                </Button>
                <div className="row">
                    <div className="filters">
                        sdfsdfsdfds
                    </div>
                    <div className="goods-table">
                        <Table className="mt-4">
                            <thead>
                            <tr>
                                <th className="column-name">Назва</th>
                                <th className="column-description">Опис</th>
                                <th className="column-producer">Виробник</th>
                                <th className="column-price">Ціна</th>
                                <th className="column-quantity">Кількість</th>
                                <th className="column-group">Група</th>
                                <th className="column-actions">Дії</th></tr>
                            </thead>
                            <tbody>
                            {goodsList}
                            </tbody>
                        </Table>
                    </div>
                </div>

                <Modal isOpen={deleteGoodModal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Підтвердіть видалення</ModalHeader>
                    <ModalBody>
                        Ви точно хочете видалити?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={confirmDelete}>Так</Button>
                        <Button color="secondary" onClick={toggleModal}>Ні</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </div>
    )
}

export default Goods;