import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const AlertModal = ({ message, isOpen, toggle }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Помилка!</ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AlertModal;