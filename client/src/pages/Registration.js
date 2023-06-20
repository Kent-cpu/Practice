import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Spinner} from "react-bootstrap";
import {handleChange} from "../utils/handleChangeInput";
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/urls";
import {registration} from "../http/userApi";
import {AuthContext} from "../contexts";


const Registration = () => {
    //@rostrud.ru
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        name: "",
        lastName: "",
        patronymic: "",
    });
    const [errors, setErrors] = useState({});
    const [isRegisterRequestSent, setIsRegisterRequestSent] = useState(false);
    const navigate = useNavigate();
    const {setUser, setIsAuth} = useContext(AuthContext);
    
    const registerUser = async () => {
        try {
            setIsRegisterRequestSent(true);
            const response = await registration(userData.email, userData.password,
                userData.name, userData.lastName, userData.patronymic);
            setUser({
                id: response.id,
                email: response.email,
            });
            setIsAuth(true);
            navigate(MAIN_ROUTE);
        }catch (e) {
            const possibleErrors = e.response.data.errors;
            if(possibleErrors.length !== 0) {
                const err = {};
                possibleErrors.forEach(error => err[error.path] = error.msg);
                setErrors(err);
            }
        }finally {
            setIsRegisterRequestSent(false);
        }
    }


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 60}}
        >
            <Card style={{width: 550}} className="p-4">
                <h2 className="m-auto">Регистрация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        name="lastName"
                        className="mt-5"
                        placeholder="Введите фамилию"
                        value={userData.lastName}
                        onChange={e => handleChange(e.target.name, e.target.value, setUserData)}
                        isInvalid={errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>

                    <Form.Control
                        name="name"
                        className="mt-3"
                        placeholder="Введите имя"
                        value={userData.name}
                        onChange={e => handleChange(e.target.name, e.target.value, setUserData)}
                        isInvalid={errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>

                    <Form.Control
                        name="patronymic"
                        className="mt-3"
                        placeholder="Введите отчество"
                        value={userData.patronymic}
                        onChange={e => handleChange(e.target.name, e.target.value, setUserData)}
                        isInvalid={errors.patronymic}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.patronymic}
                    </Form.Control.Feedback>

                    <Form.Control
                        name="email"
                        className="mt-3"
                        placeholder="Введите email"
                        value={userData.email}
                        onChange={e => handleChange(e.target.name, e.target.value, setUserData)}
                        isInvalid={errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>

                    <Form.Control
                        name="password"
                        className="mt-3"
                        type="password"
                        placeholder="Введите пароль"
                        value={userData.password}
                        onChange={e => handleChange(e.target.name, e.target.value, setUserData)}
                        isInvalid={errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>

                    <Button
                        className="mt-5 pt-2 pb-2"
                        variant="success"
                        onClick={registerUser}
                        disabled={isRegisterRequestSent}
                    >
                        {
                            isRegisterRequestSent ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                :
                                <span>Зарегистрироваться</span>
                        }
                    </Button>

                    <p className="mt-3">У вас уже есть учетная запись?
                        <NavLink to={LOGIN_ROUTE}> Войти!</NavLink>
                    </p>
                </Form>
            </Card>
        </Container>
    );
};

export default Registration;