import AppNavbar from "../../components/AppNavbar";
import { Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Goods.css';
import useGoods from "../../hooks/useGoods";
import useDeleteConfirmation from "../../hooks/useDeleteConfirmation";
import GoodRow from "./GoodRow";
import {Link} from "react-router-dom";

const Goods = () => {

    const { goods, groups, showEmpty, updateGoodsAfterDeletion } = useGoods();
    const { deleteGoodModal, toggleModal, handleDelete, confirmDelete } = useDeleteConfirmation(updateGoodsAfterDeletion);

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
                        sdfsdfsdfds
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