import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const checkToken = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">
                Головна
            </NavbarBrand>
            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="justify-content-start" style={{ width: '100%' }} navbar>
                    {checkToken() && (
                        <>
                            <NavbarBrand tag={Link} to="/goods">
                                Товари
                            </NavbarBrand>
                            <NavbarBrand tag={Link} to="/groups">
                                Групи
                            </NavbarBrand>
                        </>
                    )}
                </Nav>

                <Nav className="justify-content-end" style={{ width: '100%' }} navbar>
                    {checkToken() ? (
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