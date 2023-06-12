import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Header from "../components/Header";
import {getChecks} from "../http/checkApi";
import {AuthContext} from "../contexts";
import CheckCard from "../components/CheckCard";

const Main = () => {
    const [checks, setChecks] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        getChecks(user.id).then(findChecks => (setChecks(findChecks)));
    }, []);

    console.log(checks);

    return (
        <div>
            <Header/>
            <Container>
                <h1>Мои проверки</h1>
                {checks.map((check) => {
                    return <div className="mb-3">
                        <CheckCard
                            key={check.id}
                            id={check.id}
                            dateTest={new Date(check.dateTest).toLocaleDateString("ru-RU")}
                            company={check.company}
                            status={check.status}
                        />
                    </div>
                })}
            </Container>
        </div>
    );
};

export default Main;