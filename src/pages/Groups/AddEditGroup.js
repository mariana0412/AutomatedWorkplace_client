import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import AppNavbar from '../../components/AppNavbar';

const AddEditGroup = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchGroup();
        }
    }, [id]);

    const fetchGroup = async () => {
        try {
            const response = await fetch(`/api/group/${id}`, {
                method: 'GET',
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiZXhwIjoxNjg4MDQwOTU3LCJpYXQiOjE2ODc5NTQ1NTd9.l8z_K5GEkRqVwJFNPCU_1Q5QFve6dIbGxM7uRTP0y-U',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
            } else {
                console.error('Error fetching group');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = `/api/groups${id ? `/${id}` : ''}`;

            const response = await fetch(url, {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiZXhwIjoxNjg4MDQwOTU3LCJpYXQiOjE2ODc5NTQ1NTd9.l8z_K5GEkRqVwJFNPCU_1Q5QFve6dIbGxM7uRTP0y-U'
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
            else {
                navigate('/groups');
                setName('');
                setDescription('');
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
