import { Button, ButtonGroup } from 'reactstrap';

const GoodRow = ({ good, groups, handleDelete }) => {
    const groupName = groups.find(group => group.id === good.groupId)?.name;

    return (
        <tr key={good.id_product}>
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
    );
}

export default GoodRow;
