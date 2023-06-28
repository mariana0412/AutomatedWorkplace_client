import useGoods from "../../hooks/useGoods";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

const AddGood = () => {
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

    useEffect(() => {
        if (id) {
            fetch(`/api/goods/${id}`, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3ODkwNzIwfQ._0WNSNU5noAuU2EbROJGJpPwqcFUJuheaa-eaMUrdWg`
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
        console.log(url);

        await fetch(url, {
            method: good.id ? 'PUT' : 'POST',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3ODkwNzIwfQ._0WNSNU5noAuU2EbROJGJpPwqcFUJuheaa-eaMUrdWg`
            },
            body: JSON.stringify(good)
        });
        setGood(initialFormState);
        navigate('/goods');
    };

return (
    <div>
        <AppNavbar/>
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
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
                    <Label for="description">Description</Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        value={good.description || ''}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="producer">Producer</Label>
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
                    <Label for="price">Price</Label>
                    <Input
                        type="number"
                        name="price"
                        id="price"
                        required
                        value={good.price || ''}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="group">Group</Label>
                    <Input
                        type="select"
                        name="groupId"
                        id="groupId"
                        required
                        value={good.groupId || ''}
                        onChange={handleChange}
                    >
                        <option value="">Select Group</option>
                        {groupOptions}
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to={"/goods"}>Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
);
};

export default AddGood;