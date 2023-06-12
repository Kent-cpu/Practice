import React, {useContext} from 'react';
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import {NavLink, useNavigate} from "react-router-dom";
import {ADD_CHECK_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, STATS_ROUTE} from "../utils/urls";
import {AuthContext} from "../contexts";


function Header() {
    const {setUser, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        setUser({});
        setIsAuth(false);
        navigate(LOGIN_ROUTE);
    }

    return (
        <Navbar className="mb-4" bg="primary" expand="lg">
            <Container className="d-flex justify-content-between">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink style={{color: "white"}} className="nav-link fs-5" to={MAIN_ROUTE}>Мои проверки</NavLink>
                        <NavLink style={{color: "white"}} className="nav-link fs-5" to={ADD_CHECK_ROUTE}>Добавить проверку</NavLink>
                        <NavLink style={{color: "white"}} className="nav-link fs-5" to={STATS_ROUTE}>Статистика</NavLink>
                        <Button className={"border mt-3"} onClick={logOut}>Выйти</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
