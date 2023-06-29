import {useNavigate} from 'react-router-dom';
import AppNavbar from '../../components/AppNavbar';
import {useGroupForm} from "../../hooks/useGroupForm";
import {useState} from "react";
import AlertModal from "../../components/AlertModal";

const AddEditGroup = () => {
    const { id, name, description, handleNameChange, handleDescriptionChange } = useGroupForm();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

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
                setModalMessage("Група з такою назвою вже існує!");
                setModalOpen(true);
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

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div>
            <AppNavbar />
            <AlertModal
                message={modalMessage}
                isOpen={modalOpen}
                toggle={toggleModal}
            />
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
                            <button type="submit" className="btn btn-primary justify-content-center">Зберегти</button>
                            <button className="btn btn-secondary justify-content-center" onClick={() => navigate('/groups')}>Скасувати</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditGroup;
