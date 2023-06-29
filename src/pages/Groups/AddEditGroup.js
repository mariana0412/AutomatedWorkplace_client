import {useNavigate} from 'react-router-dom';
import AppNavbar from '../../components/AppNavbar';
import {useGroupForm} from "../../hooks/useGroupForm";

const AddEditGroup = () => {
    const { id, name, description, handleNameChange, handleDescriptionChange } = useGroupForm();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = `/api/groups${id ? `/${id}` : ''}`;

            const response = await fetch(url, {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name,
                    description
                })
            });
            if (response.status === 409) {
                const errorMessage = await response.text();
                console.error(errorMessage);
                alert("Група з такою назвою вже існує!");
            }
            else if (response.status === 403)
                localStorage.removeItem('token');
            else {
                navigate('/groups');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <AppNavbar />
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card w-50 mt-5">
                    <div className="card-body">
                        <h2 className="card-title text-center">
                            {id ? 'Редагувати групу' : 'Додати групу'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Назва:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Опис:</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary d-flex justify-content-center">
                                OK
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditGroup;
