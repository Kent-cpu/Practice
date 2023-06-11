import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import {Button, Container, Dropdown, Form, FormGroup} from "react-bootstrap";
import {getChecklists} from "../http/checklistApi";
import {AuthContext} from "../contexts";
import {saveCheck} from "../http/checkApi";

const AddCheck = () => {
    const [checklists, setCheckLists] = useState([]);
    const [selectedChecklists, setSelectedChecklists] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [company, setCompany] = useState("");
    const [dateTest, setDateTest] = useState(null);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        getChecklists().then(checklists => setCheckLists(checklists));
    }, []);

    const handleCheckboxChange = (checklistTitle) => {
        if(selectedChecklists.includes(checklistTitle)) {
            setSelectedChecklists(lists => lists.filter(item => item !== checklistTitle));
        }else {
            setSelectedChecklists(lists => [...lists, checklistTitle]);
        }
    };

    const handleDropdownToggle = (isOpen, metadata) => {
        if (metadata.source !== 'select' && isOpen) {
            setShowDropdown(isOpen);
        }
    };

    const save = async () => {
        try {
            await saveCheck(user.id, company, "Невыполненно", dateTest, selectedChecklists);
            alert("Проверка добавлена");
        }catch (e) {
            console.log(e);
        }
    }


    const renderChecklists = () => {
        return checklists.map((title, index) => {
            return (
                <Dropdown.Item style={{ whiteSpace: 'normal', maxWidth: '100%' }} key={index}>
                    <Form.Check
                        style={{fontSize: "18px"}}
                        type="checkbox"
                        label={title}
                        checked={selectedChecklists.includes(title)}
                        onMouseDown={() => handleCheckboxChange(title)}
                        onChange={() => {}}
                    />
                </Dropdown.Item>
            )
        });
    }

    return (
        <div>
            <Header/>
            <Container className="mt-5">
                <h1 className="mb-4">Добавить проверку</h1>
                <Form>
                    <FormGroup className="mb-3">
                        <Form.Label>Название компании</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название компании"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <Form.Label>Дата проверки</Form.Label>
                        <Form.Control type="date" onChange={e => setDateTest(e.target.value)} />
                    </FormGroup>

                    <Dropdown show={showDropdown} onToggle={handleDropdownToggle}  className="mb-5">
                        <Dropdown.Toggle variant="dark" id="dropdown-checkbox" onClick={() => setShowDropdown(!showDropdown)}>
                            Выберите проверочные листы
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {renderChecklists()}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button onClick={save}>Сохранить</Button>
                </Form>
            </Container>
        </div>
    );
};

export default AddCheck;