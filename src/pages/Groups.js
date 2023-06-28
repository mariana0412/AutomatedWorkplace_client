import React, { useEffect, useState } from 'react';
import AppNavbar from '../components/AppNavbar';

const Groups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await fetch('/api/group', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3OTQ1MzU1fQ.MkHPEeJVzZ0AUbknYJ2ODHz0LRNNTJY4TEb_1wmJ3ZY'
                }
            });
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (groupId) => {
        try {
            const response = await fetch(`/api/group/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3OTQ1MzU1fQ.MkHPEeJVzZ0AUbknYJ2ODHz0LRNNTJY4TEb_1wmJ3ZY'
                }
            });

            if (response.ok) {
                console.log(`Edit group with ID ${groupId}`);
            } else {
                console.error('Error editing group');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (groupId) => {
        try {
            const response = await fetch(`/api/group/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWxseWRheXN0YXJAZ21haWwuY29tIiwiaWF0IjoxNjg3OTQ1MzU1fQ.MkHPEeJVzZ0AUbknYJ2ODHz0LRNNTJY4TEb_1wmJ3ZY'
                }
            });

            if (response.ok) {
                console.log(`Delete group with ID ${groupId}`);
            } else {
                console.error('Error deleting group');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = () => {
        // Handle add button click
        console.log('Add group');
    };

    return (
        <div>
            <AppNavbar />
            <div className="text-end mt-3 me-3">
                <button className="btn btn-primary" onClick={handleAdd}>Додати групу</button>
            </div>
            <div className="table-responsive container">
                <table className="table table-bordered table-width">
                    <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Опис</th>
                        <th>Дія</th>
                    </tr>
                    </thead>
                    <tbody>
                    {groups.map((group) => (
                        <tr key={group.id}>
                            <td>{group.name}</td>
                            <td>{group.description}</td>
                            <td className="text-center">
                                <button className="btn btn-primary me-1" onClick={() => handleEdit(group.id)}>Редагувати</button>
                                <button className="btn btn-danger ms-1" onClick={() => handleDelete(group.id)}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Groups;