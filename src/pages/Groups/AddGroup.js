import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../../components/AppNavbar';

const AddGroup = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiZXhwIjoxNjg4MDQwOTU3LCJpYXQiOjE2ODc5NTQ1NTd9.l8z_K5GEkRqVwJFNPCU_1Q5QFve6dIbGxM7uRTP0y-U'
                },
                body: JSON.stringify({
                    name,
                    description
                })
            });

            if (response.ok) {
                navigate('/groups');
                setName('');
                setDescription('');
            } else {
                console.error('Error adding group');
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
                        <h2 className="card-title text-center">Додати групу</h2>
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
                            <button type="submit" className="btn btn-primary me-1">
                                OK
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddGroup;
