import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Spinner} from "react-bootstrap";
import {handleChange} from "../utils/handleChangeInput";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts";
import {login} from "../http/userApi";
import {MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/urls";


const Login = () => {
    const {setUser, setIsAuth} = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoginRequestSent, setIsLoginRequestSent] = useState(false);
    const navigate = useNavigate();


    const loginUser = async () => {
        try {
            setIsLoginRequestSent(true);
            const response = await login(userData.email, userData.password);
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
            setIsLoginRequestSent(false);
        }
    }
    

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 60}}
        >
            <Card style={{width: 550}} className="p-4">
                <h2 className="m-auto">Вход</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        name="email"
                        className="mt-5"
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

                    {errors.emailOrPassword && <p className="mt-2 mb-0 text-center text-danger">{errors.emailOrPassword}</p>}

                    <Button
                        className="mt-5 pt-2 pb-2"
                        variant="success"
                        onClick={loginUser}
                        disabled={isLoginRequestSent}
                    >
                        {
                            isLoginRequestSent ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                :
                                <span>Вход</span>
                        }
                    </Button>

                    <p className="mt-3">Нужна учетная запись?
                        <NavLink to={REGISTRATION_ROUTE}> Зарегистрироваться!</NavLink>
                    </p>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;