import React, { useState, useEffect } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(checkToken());
    }, []);

    function checkToken() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">
                Головна
            </NavbarBrand>
            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="justify-content-start" style={{ width: '100%' }} navbar>
                    {isLoggedIn && (
                        <>
                            <NavbarBrand tag={Link} to="/groups">
                                Групи
                            </NavbarBrand>
                            <NavbarBrand tag={Link} to="/goods">
                                Товари
                            </NavbarBrand>
                        </>
                    )}
                </Nav>

                <Nav className="justify-content-end" style={{ width: '100%' }} navbar>
                    {isLoggedIn ? (
                        <NavbarBrand onClick={handleLogout} tag={Link} to="/">
                            Вийти
                        </NavbarBrand>
                    ) : (
                        <NavbarBrand tag={Link} to="/login">
                            Увійти
                        </NavbarBrand>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default AppNavbar;