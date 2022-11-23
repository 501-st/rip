import React, {useEffect, useState} from 'react';
import Modal from "../styles/modal";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {Button, Input, RowContainer} from "../styles";
import axios from "axios";

const EditModal = ({id, todos, show, setShow, setTodos}) => {

    let todo = todos.find((elem) => elem.id === id)

    const [name, setName] = useState( todo.name)
    const [isCompleted, setIsCompleted] = useState(todo.completed)

    const CancelPropagation = (event) => {
        event.stopPropagation()
    }

    const DoNotReloadPage = (event) => {
        event.preventDefault()
        setShow(false)
    }

    const [isBrowser, setBrowser] = useState(false)

    useEffect(() => {
        setBrowser(true);
    }, []);

    const refreshList = async () => {
        try {
            let response = await axios.get("http://localhost:3001/api/items")
            setTodos(response.data.todos)
        } catch (e) {
            console.log(e.toJSON())
        }
    }

    const handleEdit = async () => {
        try {
            console.log(1)
            await axios.put(`http://localhost:3001/api/items/edit?id=${id}`,{
                name,
                completed: isCompleted
            })
            console.log(2)
            await refreshList()
            console.log(3)
        } catch (e) {
            console.log(e.toJSON())
        }
    }

    const content = show ? (
        <Modal setShow={setShow}>
            <form onSubmit={(event) => DoNotReloadPage(event)} onClick={CancelPropagation}>
                <Container>
                    <div>
                        <RowContainer style={{columnGap: "15px", marginBottom: "10px"}}>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={"Введите название заметки"}/>
                            <Button onClick={handleEdit} disabled={name === ""} style={{cursor: name === "" ? "initial" : "pointer"}}>
                                Изменить
                            </Button>
                        </RowContainer>
                        <RowContainer style={{columnGap: "10px", marginBottom: "20px", alignItems: "center"}}>
                            <input checked={isCompleted} onChange={() => setIsCompleted(!isCompleted)} type={"checkbox"}/>
                            <div>
                                Выполнено?
                            </div>
                        </RowContainer>
                    </div>
                </Container>
            </form>
        </Modal>
    ) : null

    return isBrowser ? createPortal(content, document.getElementById('modal-root')) : null
};

const Container = styled.div`
  padding: 30px;
  border-radius: 15px;
  width: 600px;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

export default EditModal;