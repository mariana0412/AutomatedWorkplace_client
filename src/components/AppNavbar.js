import React, { useState } from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">
                Головна
            </NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="justify-content-start" style={{ width: "100%" }} navbar>

                    <NavbarBrand tag={Link} to="/goods">
                        Товари
                    </NavbarBrand>

                    <NavbarBrand tag={Link} to="/groups">
                        Групи
                    </NavbarBrand>

                </Nav>

                {/*when auth is ready, toggle login and logout depends on token presence*/}
                <Nav className="justify-content-end" style={{ width: "100%" }} navbar>
                    <NavbarBrand tag={Link} to="/login">
                        Увійти
                    </NavbarBrand>
                </Nav>

            </Collapse>
        </Navbar>
    );
};

export default AppNavbar;