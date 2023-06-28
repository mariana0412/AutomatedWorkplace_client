import AppNavbar from "../../components/AppNavbar";
import { Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Goods.css';
import useGoods from "../../hooks/useGoods";
import useDeleteConfirmation from "../../hooks/useDeleteConfirmation";
import GoodRow from "./GoodRow";

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
                                <th className="column-actions">Дії</th>
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