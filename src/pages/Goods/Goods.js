import AppNavbar from "../../components/AppNavbar";
import {Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input} from 'reactstrap';
import './Goods.css';
import useGoods from "../../hooks/good/useGoods";
import useDeleteGoodConfirmation from "../../hooks/good/useDeleteGoodConfirmation";
import GoodRow from "./GoodRow";
import {Link} from "react-router-dom";
import {useState} from "react";
import useTotalCost from "../../hooks/good/useTotalCost";

const Goods = () => {

    const { goods, groups, showEmpty, updateGoodsAfterDeletion, fetchGoodsByGroup } = useGoods();
    const { deleteGoodModal, toggleModal, handleDelete, confirmDelete } = useDeleteGoodConfirmation(updateGoodsAfterDeletion);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const {totalCost, fetchTotalCost } = useTotalCost();
    const [showTotalCost, setShowTotalCost] = useState(false);

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
            selectedGroup={selectedGroup}
            selectedName={selectedName}
            fetchTotalCost={fetchTotalCost}
        />
    );

    const handleTotalCost = () => {
        fetchTotalCost(selectedGroup, selectedName);
        setShowTotalCost(true);
    }

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="button-container">
                    <Button className="buttonWithMargins" color="success" tag={Link} to="/goods/new">
                        Додати
                    </Button>
                    <Button className="multiline-button" onClick={handleTotalCost}>
                        Обрахувати<br />загальну вартість
                    </Button>
                </div>

                <div className="row">

                    <div className="filters">
                        <FormGroup>
                            <Input
                                type="text"
                                placeholder="Назва товару..."
                                value={selectedName}
                                onChange={handleNameChange}
                            />
                        </FormGroup>

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
                    </div>

                    <div className="goods-table">
                        <Table className="mt-4 table table-bordered table-width">
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

                <Modal isOpen={showTotalCost} toggle={() => setShowTotalCost(false)}>
                    <ModalHeader toggle={() => setShowTotalCost(false)}>
                        Загальна вартість
                    </ModalHeader>
                    <ModalBody>
                        {totalCost} грн
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => setShowTotalCost(false)}>
                            Закрити
                        </Button>
                    </ModalFooter>
                </Modal>

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