import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import {ADD_CHECK_ROUTE, HISTORY_ROUTE, MAIN_ROUTE, STATS_ROUTE} from "../utils/urls";


function Header() {
    return (
        <Navbar bg="primary" expand="lg">
            <Container className="d-flex justify-content-between">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink style={{color: "white"}} className="nav-link fs-5" to={MAIN_ROUTE}>Мои проверки</NavLink>
                        <NavLink style={{color: "white"}} className="nav-link fs-5" to={ADD_CHECK_ROUTE}>Добавить проверку</NavLink>
                        <NavLink style={{color: "white"}} className="nav-link fs-5" to={HISTORY_ROUTE}>История проверок</NavLink>
                        <NavLink style={{color: "white"}} className="nav-link fs-5" to={STATS_ROUTE}>Статистика</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
