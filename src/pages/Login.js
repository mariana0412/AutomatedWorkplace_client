import React, {useState} from 'react';
import MD5 from "crypto-js/md5";
import AppNavbar from "../components/AppNavbar";
import {useNavigate} from "react-router-dom";
import AlertModal from "../components/AlertModal";

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleLogin = async () => {
        try {
            const hashedPassword = MD5(password).toString();
            const response = await fetch(`/login?login=${login}&password=${hashedPassword}`, {
                method: 'POST',
            });
            if (response.status === 200) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                navigate('/');
            } else {
                setModalMessage("Неправильний логін або пароль.");
                setModalOpen(true);
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
            <AppNavbar/>
            <AlertModal
                message={modalMessage}
                isOpen={modalOpen}
                toggle={toggleModal}
            />
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card w-50 mt-5">
                    <div className="card-body">
                        <h2 className="mt-4 card-title text-center">Вхід</h2>
                        <form>
                            <div className="form-group">
                                <label>Логін:</label>
                                <input
                                    type="text"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Пароль:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <button type="button" onClick={handleLogin} className="btn btn-primary mt-3">
                                Увійти
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;