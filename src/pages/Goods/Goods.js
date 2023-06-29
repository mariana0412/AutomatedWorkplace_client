import AppNavbar from "../../components/AppNavbar";
import {Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input} from 'reactstrap';
import './Goods.css';
import useGoods from "../../hooks/useGoods";
import useDeleteConfirmation from "../../hooks/useDeleteConfirmation";
import GoodRow from "./GoodRow";
import {Link} from "react-router-dom";
import {useState} from "react";

const Goods = () => {

    const { goods, groups, showEmpty, updateGoodsAfterDeletion, fetchGoodsByGroup } = useGoods();
    const { deleteGoodModal, toggleModal, handleDelete, confirmDelete } = useDeleteConfirmation(updateGoodsAfterDeletion);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedName, setSelectedName] = useState("");

    const handleFilterChange = async (newGroupId, newName) => {
        await fetchGoodsByGroup(newGroupId, newName);
    };

    const handleGroupChange = (e) => {
        const newGroupId = e.target.value;
        setSelectedGroup(newGroupId);
        handleFilterChange(newGroupId, selectedName);
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setSelectedName(newName);
        handleFilterChange(selectedGroup, newName);
    };

    const goodsList = goods.map(good =>
        <GoodRow
            key={good.id_product}
            good={good}
            groups={groups}
            handleDelete={handleDelete}
        />
    );

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <Button className="buttonWithMargins" color="success" tag={Link} to="/goods/new">
                    Додати
                </Button>
                <div className="row">

                    <div className="filters">
                        <FormGroup>
                            <Input type="select" value={selectedGroup} onChange={handleGroupChange}>
                                <option value="">Усі групи</option>
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Input
                                type="text"
                                placeholder="Назва"
                                value={selectedName}
                                onChange={handleNameChange}
                            />
                        </FormGroup>
                    </div>

                    <div className="goods-table">
                        <Table className="mt-4">
                            <thead>
                            <tr>
                                <th>Назва</th>
                                <th>Опис</th>
                                <th>Виробник</th>
                                <th>Ціна</th>
                                <th>Кількість</th>
                                <th>Група</th>
                                <th>Дії</th>
                            </tr>
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
    );
}

export default Goods;