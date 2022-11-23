import {Button, Input, RowContainer, Wrapper} from "./styles";
import {useEffect, useState} from "react";
import axios from "axios";
import EditModal from "./components/edit-modal";

function App() {

    const [todos, setTodos] = useState([])
    const [name, setName] = useState("")
    const [isCompleted, setIsCompleted] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editId, setEditId] = useState(null)

    const handleClickCheckbox = () => {
        setIsCompleted(!isCompleted)
    }

    const refreshList = async () => {
        try {
            let response = await axios.get("http://localhost:3001/api/items")
            setTodos(response.data.todos)
        } catch (e) {
            console.log(e.toJSON())
        }
    }

    useEffect(() => {
        async function fetchData() {
            await refreshList()
        }
        fetchData()
    }, [])

    const handleClickAdd = async () => {
        try {
            await axios.post("http://localhost:3001/api/items/create", {
                name: name,
                completed: isCompleted
            })
            await refreshList()
        } catch (e) {
            console.log(e.toJSON())
        }
        setName("")
        setIsCompleted(false)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/items?id=${id}`)
            await refreshList()
        } catch (e) {
            console.log(e.toJSON())
        }
    }

    const handleEditShow = (idElem) => {
        setEditId(idElem)
        setShowEditModal(true)
    }

    return (
        <Wrapper>
            <div>
                <RowContainer style={{columnGap: "15px", marginBottom: "10px"}}>
                    <Input value={name} onChange={(e) => setName(e.target.value)}
                           placeholder={"Введите название заметки"}/>
                    <Button disabled={name === ""} style={{cursor: name === "" ? "initial" : "pointer"}}
                            onClick={handleClickAdd}>
                        Добавить
                    </Button>
                </RowContainer>
                <RowContainer style={{columnGap: "10px", marginBottom: "20px", alignItems: "center"}}>
                    <input checked={isCompleted} onChange={handleClickCheckbox} type={"checkbox"}/>
                    <div>
                        Выполнено?
                    </div>
                </RowContainer>
            </div>
            {todos.map((item, index) => (
                <RowContainer key={index} style={{
                    alignItems: "center",
                    backgroundColor: "#b3e667",
                    borderRadius: "20px",
                    padding: "25px",
                    marginBottom: "20px",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <div>
                        <div style={{marginBottom: "20px"}}>
                            {item.name}
                        </div>
                        <RowContainer>
                            <div>
                                Выполнено:&nbsp;
                            </div>
                            <div>
                                {item.completed ? "Да" : "Нет"}
                            </div>
                        </RowContainer>
                    </div>
                    <RowContainer style={{columnGap: "20px"}}>
                        <Button onClick={() => handleEditShow(item.id)} style={{backgroundColor: "yellow"}}>
                            Редактировать
                        </Button>
                        <Button onClick={() => handleDelete(item.id)} style={{backgroundColor: "red"}}>
                            Удалить
                        </Button>
                    </RowContainer>
                </RowContainer>
            ))}
            {showEditModal && <EditModal setTodos={setTodos} id={editId} todos={todos} show={showEditModal} setShow={setShowEditModal}/>}
        </Wrapper>
    );
}

export default App;