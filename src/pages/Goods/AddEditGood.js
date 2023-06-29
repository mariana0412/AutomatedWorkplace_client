import useGoods from "../../hooks/good/useGoods";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AlertModal from "../../components/AlertModal";

const AddEditGood = () => {
    const initialFormState = {
        id: '',
        name: '',
        description: '',
        producer: '',
        price: '',
        quantity: '',
        groupId: '',
    }

    const { groups } = useGoods();
    const [good, setGood] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        if (id) {
            fetch(`/api/goods/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .then(data => setGood(data));
        }
    }, [id]);

    const groupOptions = groups.map((group) => {
        return (
            <option key={group.id} value={group.id}>
                {group.name}
            </option>
        );
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGood({ ...good, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = `/api/goods${good.id ? `/${good.id}` : ''}`;

        const response = await fetch(url, {
            method: good.id ? 'PUT' : 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(good)
        });

        if (response.status === 409) {
            const errorMessage = await response.text();
            if(errorMessage === "Good with this name already exists!") {
                setModalMessage("Товар з такою назвою вже існує!");
                setModalOpen(true);
            }
            else if(errorMessage === "Price can't be negative!") {
                setModalMessage("Ціна товару не може бути від'ємною!");
                setModalOpen(true);
            }
        }
        else if (response.status === 403)
            localStorage.removeItem('token');
        else {
            setGood(initialFormState);
            navigate('/goods');
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

return (
    <div>
        <AppNavbar/>
        <AlertModal
            message={modalMessage}
            isOpen={modalOpen}
            toggle={toggleModal}
        />
        <Container>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card w-50 mt-5">
                    <div className="card-body">
                        <h2 className="card-title text-center">
                            {id ? 'Редагувати товар' : 'Додати товар'}
                        </h2>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name">Назва</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={good.name || ''}
                                    onChange={handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="description">Опис</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    required
                                    value={good.description || ''}
                                    onChange={handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="producer">Виробник</Label>
                                <Input
                                    type="text"
                                    name="producer"
                                    id="producer"
                                    required
                                    value={good.producer || ''}
                                    onChange={handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="price">Ціна</Label>
                                <Input
                                    type="number"
                                    name="price"
                                    id="price"
                                    required
                                    min="0"
                                    value={good.price || ''}
                                    onChange={e => {
                                        const value = Number(e.target.value);
                                        if (value >= 0) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="group">Група</Label>
                                <Input
                                    type="select"
                                    name="groupId"
                                    id="groupId"
                                    required
                                    value={good.groupId || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Обрати групу</option>
                                    {groupOptions}
                                </Input>
                            </FormGroup>

                            <FormGroup style={{'margin-top': '40px'}}>
                                <Button color="primary" type="submit">Зберегти</Button>{' '}
                                <Button color="secondary" tag={Link} to={"/goods"}>Скасувати</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    </div>
);
};

export default AddEditGood;
